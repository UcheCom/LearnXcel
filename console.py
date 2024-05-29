#!/usr/bin/python3
"""Contains the entry point of the command interpreter"""

import cmd
import shlex
import models
from models.base_model import BaseModel
from models.user import User

classes = {"User": User, "BaseModel": BaseModel}

class TASKCommand(cmd.Cmd):
    """
    TASKCommand class for a simple command-line interpreter.
    
    Implements basic commands and a custom prompt for the TASK MANAGER console.
    """
    
    prompt = '(TASK) '
    
    def do_EOF(self, arg):
        """Exit the console program with ^C"""
        print()
        return True
    
    def do_quit(self, arg):
        """Exit console program with the keyword quit"""
        return True
    
    def do_emptyline(self):
        """Print nothing when line is empty"""
        pass
    
    def _key_value_parser(self, args):
        """creates a dictionary from a list of strings"""
        new_dict = {}
        for arg in args:
            if "=" in arg:
                kvp = arg.split('=', 1)
                key = kvp[0]
                value = kvp[1]
                if value[0] == value[-1] == '"':
                    value = shlex.split(value)[0].replace('_', ' ')
                else:
                    try:
                        value = int(value)
                    except:
                        try:
                            value = float(value)
                        except:
                            continue
                new_dict[key] = value
        return new_dict
    
    def do_create(self, arg):
        """Creates a new instance of a specified class with given parameters and saves it.

        Command syntax: create <Class name> <param 1> <param 2> <param 3>...
        Param syntax: <key name>=<value>
        Value syntax:
        - String: "<value>" => starts with a double quote
        Any double quote inside the value must be escaped with a backslash \
        All underscores _ must be replaced by spaces
        Example: name="My_little_house"
        - Float: <unit>.<decimal> => contains a dot .
        - Integer: <number> => default case

        If any parameter doesn’t fit with these requirements or can’t be recognized correctly by your program, it must be skipped.

        """
        args = arg.split()
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            new_dict = self._key_value_parser(args[1:])
            instance = classes[args[0]](**new_dict)
        else:
            print("** class doesn't exist **")
            return False
        print(instance.id)
        instance.save()

                
    def do_show(self, arg):
        """Prints an instance as a string based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            if len(args) > 1:
                key = args[0] + "." + args[1]
                if key in models.storage.all():
                    print(models.storage.all()[key])
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")
                
    def do_destroy(self, arg):
        """
        Deletes an instance based on the class name and id (save the change into the JSON file).

        Usage: destroy <class_name> <id>
        """
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                key = args[0] + "." + args[1]
                if key in models.storage.all():
                    models.storage.all().pop(key)
                    models.storage.save()
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")
                
    def do_all(self, arg):
        """
        Prints all string representation of all instances based or not on the class name.

        Usage: all [class_name]
        """
        args = shlex.split(arg)
        obj_list = []
        if len(args) == 0:
            obj_dict = models.storage.all()
        elif args[0] in classes:
            obj_dict = models.storage.all(classes[args[0]])
        else:
            print("** class doesn't exist **")
            return False
        
        if obj_list is not None:
            for key in obj_dict:
                obj_list.append(str(obj_dict[key]))
            print("[", end="")
            print(", ".join(obj_list), end="")
            print("]")
    
    def do_update(self, arg):
        """
        Updates an instance based on the class name and id by adding or updating an attribute (save the change into the JSON file).

        Usage: update <class_name> <id> <attribute_name> "<attribute_value>"
        """
        args = shlex.split(arg)
        integers = ["number_rooms", "number_bathrooms", "max_guest",
                    "price_by_night"]
        floats = ["latitude", "longitude"]
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                k = args[0] + "." + args[1]
                if k in models.storage.all():
                    if len(args) > 2:
                        if len(args) > 3:
                            if args[0] == "Place":
                                if args[2] in integers:
                                    try:
                                        args[3] = int(args[3])
                                    except:
                                        args[3] = 0
                                elif args[2] in floats:
                                    try:
                                        args[3] = float(args[3])
                                    except:
                                        args[3] = 0.0
                            setattr(models.storage.all()[k], args[2], args[3])
                            models.storage.all()[k].save()
                        else:
                            print("** value missing **")
                    else:
                        print("** attribute name missing **")
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")


if __name__ == '__main__':
    """
    Entry point of the program. Creates an instance of TASKCommand and starts the command loop.
    """
    TASKCommand().cmdloop()