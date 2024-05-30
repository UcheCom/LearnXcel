#!/usr/bin/env python3
"""Enumeration class for User roles"""


from enum import Enum
from sqlalchemy import Enum

class UserRole(Enum):
    ADMIN = "admin"
    STUDENT = "student"
    INSTRUCTOR = "instructor"
