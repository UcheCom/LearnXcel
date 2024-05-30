#!/usr/bin/env python3
"""Enumeration class for User roles"""


import enum

class UserRole(enum.Enum):
    ADMIN = "admin"
    STUDENT = "student"
    INSTRUCTOR = "instructor"
