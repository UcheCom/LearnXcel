#!/usr/bin/env python3
"""Enumeration class for User roles"""


from enum import Enum
import json
from flask.json import JSONEncoder
from sqlalchemy import Enum

class UserRole(Enum):
    ADMIN = "admin"
    STUDENT = "student"
    INSTRUCTOR = "instructor"



class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.value
        return super().default(obj)
