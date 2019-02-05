DROP DATABASE IF EXISTS autoflipperdb;
CREATE DATABASE autoflipperdb;

USE autoflipperdb;

CREATE TABLE cars (

    make VARCHAR(100),
    model VARCHAR(100),
    modelYear INT NULL,
    price INT,
    kilometers INT,
 
  
);

INSERT INTO cars (make, model, modelYear, price, kilometers) VALUES ("Honda", "Civic", 2014, 9800, 105000)