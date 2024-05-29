#!/usr/bin/python3
"""User class that inherits from BaseModel"""

import models
import hashlib
from models.base_model import BaseModel, Base
from models.user_role import UserRole
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Enum
from sqlalchemy.orm import relationship, backref

class User(BaseModel, Base):
    """
    User class that inherits from BaseModel.

    Public class attributes:
    - email: string - empty string
    - password: string - empty string
    - first_name: string - empty string
    - last_name: string - empty string
    """
    if models.sqlStorage_t == "db":
        __tablename__ = "users"
        email = Column(String(320), nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=False, default="")
        last_name = Column(String(128), nullable=False, default="")
        username = Column(String(120), nullable=False, default="")
        role = Column(Enum(UserRole), nullable=False, default=UserRole.STUDENT)
    else:
        email = ""
        password = ""
        first_name = ""
        last_name = ""
        username = ""
        role = UserRole.STUDENT
    
    def __init__(self, *args, **kwargs):
        """Constructor for User class."""
        super().__init__(*args, **kwargs)
        self.email = kwargs.get('email', "")
        self.password = kwargs.get('password', "")
        self.first_name = kwargs.get('first_name', "")
        self.last_name = kwargs.get('last_name', "")

    @property
    def password(self) -> str:
        """ Getter of the password
        """
        return self._password

    @password.setter
    def password(self, pwd: str):
        """ Setter of a new password: encrypt in SHA256
        """
        if pwd is None or type(pwd) is not str:
            self._password = None
        else:
            self._password = hashlib.sha256(pwd.encode()).hexdigest().lower()

    def is_valid_password(self, pwd: str) -> bool:
        """ Validate a password
        """
        if pwd is None or type(pwd) is not str:
            return False
        if self.password is None:
            return False
        pwd_e = pwd.encode()
        return hashlib.sha256(pwd_e).hexdigest().lower() == self.password

    def display_name(self) -> str:
        """ Display User name based on email/first_name/last_name
        """
        if self.email is None and self.first_name is None \
                and self.last_name is None:
            return ""
        if self.first_name is None and self.last_name is None:
            return "{}".format(self.email)
        if self.last_name is None:
            return "{}".format(self.first_name)
        if self.first_name is None:
            return "{}".format(self.last_name)
        else:
            return "{} {}".format(self.first_name, self.last_name)
            