#!/usr/bin/env bash

TASK_MYSQL_USER=task_dev TASK_MYSQL_PWD=task_dev_pwd TASK_MYSQL_HOST=localhost TASK_MYSQL_DB=task_dev_db TASK_TYPE_STORAGE=db TASK_API_HOST=0.0.0.0 TASK_API_PORT=5000 python3 -m api.v1.app