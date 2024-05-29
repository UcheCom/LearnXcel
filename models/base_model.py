#!/usr/bin/python3
"""BaseModel takes care of the initialization, serialization and deserialization of future instances."""

import uuid
import models
import inspect
from os import getenv
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base


time = "%Y-%m-%dT%H:%M:%S.%f"


if models.sqlStorage_t == "db":
    Base = declarative_base()
else:
    Base = object


class BaseModel:
    """
    Defines a base model class with common attributes and methods for other classes.

    Public instance attributes:
    - id (str): Unique identifier for each BaseModel instance.
    - created_at (datetime): Timestamp for when the BaseModel instance was created.
    - updated_at (datetime): Timestamp for when the BaseModel instance was last updated.

    Public instance methods:
    - save(self): Updates the 'updated_at' attribute with the current datetime and saves the changes.
    - to_dict(self): Returns a dictionary containing all keys and values of the instance's attributes.
    - delete(self): Deletes the instance from the database.

    Special method:
    - __str__(self): Returns a string representation of the BaseModel instance.
    """
    def __init__(self, *args, **kwargs):
        """
        Initializes a new BaseModel instance.

        This method constructs a new instance of the BaseModel class. It can be
        called with positional and/or keyword arguments. If keyword arguments
        are provided, their keys are used as attribute names, and their values
        are assigned to corresponding attributes of the instance.

        Args:
            *args: Unused. This method does not accept positional arguments.
            **kwargs: Dictionary of attribute names and values. These are used
                to initialize the attributes of the BaseModel instance.

                The following special keyword arguments are recognized:
                - 'created_at' (str, optional): A string representation of the
                    creation timestamp in ISO 8601 format. If provided, it is
                    parsed into a datetime object and assigned to the
                    'created_at' attribute. If not provided or not in a valid
                    format, the current UTC timestamp is used.
                - 'updated_at' (str, optional): A string representation of the
                    last update timestamp in ISO 8601 format. If provided, it is
                    parsed into a datetime object and assigned to the 'updated_at'
                    attribute. If not provided or not in a valid format, the current
                    UTC timestamp is used.
                - 'id' (str, optional): A unique identifier for the BaseModel
                    instance. If not provided, a new UUID4 string is generated
                    and assigned to the 'id' attribute.

        Attributes:
            id (str): A unique identifier for the BaseModel instance.
            created_at (datetime): The timestamp indicating when the BaseModel
                instance was created. It is initialized to the current UTC time
                if not provided as a keyword argument or if the provided value
                is not in a valid format.
            updated_at (datetime): The timestamp indicating when the BaseModel
                instance was last updated. It is initialized to the same value
                as 'created_at' if not provided as a keyword argument or if the
                provided value is not in a valid format.
        """
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at", None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            else:
                self.created_at = datetime.utcnow()
            if kwargs.get("updated_at", None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs["updated_at"], time)
            else:
                self.updated_at = datetime.utcnow()
            if kwargs.get("id", None) is None:
                self.id = str(uuid.uuid4())
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at

    def save(self):
        """
        Updates the public instance attribute `updated_at` 
        with the current datetime.
        """
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self):
        """
        Returns a dictionary representation of the instance.

        Returns:
        - dict: Dictionary containing all keys/values of __dict__ of the instance.
        """
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
        new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        frame = inspect.currentframe().f_back
        func_name = frame.f_code.co_name
        class_name = ''
        if 'self' in frame.f_locals:
            class_name = frame.f_locals["self"].__class__.__name__
        is_fs_writing = func_name == 'save' and class_name == 'FileStorage'
        if 'password' in new_dict and not is_fs_writing:
            del new_dict['password']
        return new_dict

    def __str__(self):
            """
            Returns a string representation of the BaseModel instance.

            Returns:
            - str: String representation in the format: "[<class name>] (<self.id>) <self.__dict__>"
            """
            return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id,
                                            self.__dict__)

    def delete(self):
        """delete the current instance from the storage"""
        models.storage.delete(self)