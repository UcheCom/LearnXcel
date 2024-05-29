#!/usr/bin/bash

import models
import sqlalchemy
from os import getenv
from sqlalchemy import create_engine
from models.base_model import BaseModel, Base
from sqlalchemy.orm import scoped_session, sessionmaker
from models.user import User

classes = {"User": User}

class DBStorage:
    """
    DBStorage class handles storage for MySQL database.

    Attributes:
        __engine (sqlalchemy.engine.Engine): SQLAlchemy engine.
        __session (sqlalchemy.orm.session.Session): SQLAlchemy session.
    """
    __engine = None
    __session = None
    
    def __init__(self):
        """
        Initialize a new DBStorage instance.
        Sets up the database connection and drops all tables if in test environment.
        """
        LEARNXCEL_MYSQL_USER = getenv('LEARNXCEL_MYSQL_USER')
        LEARNXCEL_MYSQL_PWD= getenv('LEARNXCEL_MYSQL_PWD')
        LEARNXCEL_MYSQL_HOST = getenv('LEARNXCEL_MYSQL_HOST')
        LEARNXCEL_MYSQL_DB = getenv('LEARNXCEL_MYSQL_DB')
        LEARNXCEL_ENV = getenv('LEARN_ENV')
        
        if not all([LEARNXCEL_MYSQL_USER, LEARNXCEL_MYSQL_PWD, LEARNXCEL_MYSQL_HOST, LEARNXCEL_MYSQL_DB]):
            raise EnvironmentError("One or more required environment variables are missing.")
        
        self.__engine = create_engine('mysql+pymysql://{}:{}@{}/{}'.
                                      format(LEARNXCEL_MYSQL_USER,
                                             LEARNXCEL_MYSQL_PWD,
                                             LEARNXCEL_MYSQL_HOST,
                                             LEARNXCEL_MYSQL_DB),
                                      pool_pre_ping=True)
        
        if LEARNXCEL_ENV == "test":
            Base.metadata.drop_all(bind=self.__engine)
            
    def all(self, cls=None):
        """
        Query all objects of a specific class from the current database session.
        
        Args:
            cls (type, optional): The class to query objects for. 
                                  If None, queries all classes.
        
        Returns:
            dict: A dictionary of objects with keys in the format <class name>.<object id>.
        """
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)
    
    def new(self, obj):
        """
        Add the object to the current database session.
        
        Args:
            obj (BaseModel): The object to add to the session.
        """
        self.__session.add(obj)
            
    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()
        
    def delete(self, obj=None):
        """
        Delete an object from the current database session.
        
        Args:
            obj (BaseModel, optional): The object to delete from the session. 
                If None, no action is taken.
        """
        if obj is not None:
            self.__session.delete(obj)
            
    def reload(self):
        """
        Creates all tables in the database.
        Creates the current database session.
        """
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine,
                                       expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session()
        
    def close(self):
        """
        Closes Session
        """
        self.__session.close()

    def get(self, cls, id):
        """
        Retrieve an object of a class by id.
        
        Args:
            cls (type): The class of the object.
            id (str): The ID of the object.
        
        Returns:
            BaseModel: The object with the given class and id, or None if not found.
        """
        obj = None
        if cls is not None and issubclass(cls, BaseModel):
            obj = self.__session.query(cls).filter(cls.id == id).first()
        return obj

    def count(self, cls=None):
        """
        Count the number of objects in storage of a specific class, or all objects if no class is specified.
        
        Args:
            cls (type, optional): The class of objects to count. If None, counts all objects.
        
        Returns:
            int: The number of objects in storage.
        """
        return len(self.all(cls))