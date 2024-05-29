#!/usr/bin/python3
"""Flask Application"""

from flask import Flask, jsonify, make_response, render_template
from models import storage
from api.v1.views import app_views
from os import environ
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from


app = Flask(__name__)
app.register_blueprint(app_views)

if __name__ == "__main__":
    """ Main Function """
    host = environ.get('LEARNXCEL_API_HOST')
    port = environ.get('LEARNXCEL_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port, threaded=True)