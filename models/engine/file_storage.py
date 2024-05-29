#!/usr/bin/python3
"""FileStorage serializes instances to a JSON file and deserializes JSON file to instances."""

import json
import models
from models.user import User
from datetime import datetime
from models.base_model import BaseModel

classes = {"User": User, "BaseModel": BaseModel}

class CustomEncoder(json.JSONEncoder):
    """
    Custom JSON encoder for serializing datetime objects.

    This encoder extends the json.JSONEncoder class and overrides the default method
    to handle serialization of datetime objects. When encountering a datetime object,
    it returns its ISO 8601 formatted string representation.

    Usage:
    ```
    with open("data.json", "w") as file:
        json.dump(data, file, cls=CustomEncoder)
    ```

    Attributes:
    - No additional attributes.

    Methods:
    - default(obj): Overrides the default method of JSONEncoder. Handles serialization
      of datetime objects by returning their ISO 8601 formatted string representation.
    """

    def default(self, obj):
        """
        Override the default method of JSONEncoder.

        Args:
        - obj: The object to be serialized.

        Returns:
        - Serialized representation of the object.

        Raises:
        - Calls the superclass's default method for unsupported object types.
        """
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)


class FileStorage:
    """
    FileStorage class
    
    Serializes instances to a JSON file and deserializes JSON file to instances
    """
    __file_path = "file.json"
    __objects = {}
    
    def all(self, cls=None):
        """returns the dictionary __objects"""
        if cls is not None:
            new_dict = {}
            for key, value in self.__objects.items():
                if cls == value.__class__ or cls == value.__class__.__name__:
                    new_dict[key] = value
            return new_dict
        return self.__objects
    
    def new(self, obj):
        """sets in __objects the obj with key <obj class name>.id"""
        if obj is not None:
            key = str(obj.__class__.__name__) + "." + str(obj.id)
            self.__objects[key] = obj
        
    def save(self):
        """
        Serializes __objects to the JSON file.
        """
        serialized_objects = {}
        for key, obj in FileStorage.__objects.items():
            serialized_objects[key] = obj.to_dict()
        
        with open(FileStorage.__file_path, 'w') as file:
            json.dump(serialized_objects, file, cls=CustomEncoder)
            
    def get_class(self, class_name):
        """
        Returns the class object based on the class name.
        """
        try:
            return globals()[class_name]
        except KeyError:
            return None
    
    def reload(self):
        """deserializes the JSON file to __objects"""
        try:
            with open(self.__file_path, 'r') as f:
                jo = json.load(f)
            for key in jo:
                self.__objects[key] = classes[jo[key]["__class__"]](**jo[key])
        except:
            pass
    
    def delete(self, obj=None):
        """delete obj from __objects if it’s inside"""
        if obj is not None:
            key = str(obj.__class__.__name__) + '.' + str(obj.id)
            FileStorage.__objects.pop(key, None)
            self.save()
                
    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None
    
    def count(self, cls=None):
        """Return the count of objects of class."""
        count = 0
        if cls is not None:
            for k in self.__objects.keys():
                if cls.__name__ in k:
                    count += 1
        else:
            count = len(self.__objects)
        return count
    
    def close(self):
        """call reload() method for deserializing the JSON file to objects"""
        self.reload()