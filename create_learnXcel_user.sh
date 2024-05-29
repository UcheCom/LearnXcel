#!/usr/bin/env bash

echo 'create User email="Iverson" password="1234354" first_name="Iverson" last_name="Kwabina" role="Instructor"' | LEARNXCEL_MYSQL_USER=learnXcel_dev LEARNXCEL_MYSQL_PWD=learnXcel_dev_pwd LEARNXCEL_MYSQL_HOST=localhost LEARNXCEL_MYSQL_DB=learnXcel_dev_db LEARNXCEL_TYPE_STORAGE=db console.py