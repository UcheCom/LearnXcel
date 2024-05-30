#!/usr/bin/env python3
""" Module of Users views
"""


from models import storage
from models.user import User
from api.v1.views import app_views
from flask import abort, jsonify, request,  make_response


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users() -> str:
    """ GET /api/v1/users
    Return:
      - list of all User objects JSON represented
    """
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users)

@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id: str) -> str:
    """ GET /api/v1/users/:id
    Path parameter:
      - User ID
    Return:
      - User object JSON represented
      - 404 if the User ID doesn't exist
    """
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    return jsonify(user.to_dict())

@app_views.route('/users/<user_id>', methods=['DELETE'], strict_slashes=False)
def delete_user(user_id: str) -> str:
    """ DELETE /api/v1/users/:id
    Path parameter:
      - User ID
    Return:
      - empty JSON is the User has been correctly deleted
      - 404 if the User ID doesn't exist
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)
    storage.delete(user)
    storage.save()
    return make_response(jsonify({}), 200)

@app_views.route('/users', methods=['POST'], strict_slashes=False)
def create_user() -> str:
    """ POST /api/v1/users/
    JSON body:
      - email
      - password
      - last_name (optional)
      - first_name (optional)
    Return:
      - User object JSON represented
      - 400 if can't create the new User
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")
    if 'username' not in request.get_json():
        abort(400, description="Missing username")
    if 'role' not in request.get_json():
        abort(400, description="Missing role")

    data = request.get_json()
    instance = User(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def update_user(user_id: str) -> str:
    """ PUT /api/v1/users/:id
    Path parameter:
      - User ID
    JSON body:
      - last_name (optional)
      - first_name (optional)
    Return:
      - User object JSON represented
      - 404 if the User ID doesn't exist
      - 400 if can't update the User
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)