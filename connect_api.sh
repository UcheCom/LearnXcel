#!/usr/bin/env bash

LEARNXCEL_MYSQL_USER=learnXcel_dev LEARNXCEL_MYSQL_PWD=learnXcel_dev_pwd LEARNXCEL_MYSQL_HOST=localhost LEARNXCEL_MYSQL_DB=learnXcel_dev_db LEARNXCEL_TYPE_STORAGE=db LEARNXCEL_API_HOST=0.0.0.0 LEARNXCEL_API_PORT=5000 python3 -m api.v1.app