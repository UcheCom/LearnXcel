-- Create the database learnXcel_dev_db if it doesn't exit.
CREATE DATABASE IF NOT EXISTS learnXcel_dev_db;

-- Create user (learnXcel_dev) if doesn't exit and set password.
CREATE USER IF NOT EXISTS 'learnXcel_dev'@'localhost' IDENTIFIED BY 'learnXcel_dev_pwd';

-- Grant all privileges on learnXcel_dev_db to the user learnXcel_dev
GRANT ALL PRIVILEGES ON learnXcel_dev_db.* TO 'learnXcel_dev'@'localhost';

-- Grant SELECT privilege on performance_schema to the user learnXcel_dev
GRANT SELECT ON performance_schema.* TO 'learnXcel_dev'@'localhost';