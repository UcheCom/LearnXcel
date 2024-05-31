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

@app_views.route('/users/<user_id>', methods=['PUT', 'PATCH'], strict_slashes=False)
def update_user(user_id: str) -> str:
    """ Update /api/v1/users/:id
    Path parameter:
      - User ID
    Return:
      - JSON representation of the updated user
      - 404 if the User ID doesn't exist
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)
    
    if request.method == 'PUT':
        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
    
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)