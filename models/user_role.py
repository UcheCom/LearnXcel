#!/usr/bin/env python3
"""Enumeration class for User roles"""


import enum
from sqlalchemy import Column, Enum

class UserRole(enum.Enum):
    ADMIN = "admin"
    STUDENT = "student"
    INSTRUCTOR = "instructor"