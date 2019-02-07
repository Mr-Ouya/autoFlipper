DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;

USE user_db;

CREATE TABLE accounts (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO accounts (username, password, email) VALUES ('test', 'test', 'test@test.com');
