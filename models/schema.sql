-- Delete, Establish, and Use database
DROP DATABASE IF EXISTS coffee_db;

CREATE DATABASE coffee_db;

USE coffee_db;

-- First table 
CREATE TABLE light (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(45) NOT NULL,
priceperoz int default 0,
origin, VARCHAR(45) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM light;

-- Second table
CREATE TABLE medium (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(45) NOT NULL,
priceperoz int default 0,
origin, VARCHAR(45) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM medium;

-- Third Table
CREATE TABLE dark (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(45) NOT NULL,
priceperoz int default 0,
origin, VARCHAR(45) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM dark;

-- Fourth table
CREATE TABLE vender (
id INT NOT NULL AUTO_INCREMENT,
-- title VARCHAR(45) NOT NULL,
-- priceperoz int default 0,
PRIMARY KEY (id)
);

SELECT * FROM vender;
