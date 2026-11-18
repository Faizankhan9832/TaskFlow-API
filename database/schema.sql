-- TaskFlow API database schema

CREATE DATABASE IF NOT EXISTS taskflow_db;

USE taskflow_db;

-- Create users table here
CREATE TABLE users (
user_id int primary key auto_increment,
name varchar(100) not null,
email varchar(150) UNIQUE not null, 
password varchar (255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)   ;


-- Create projects table here

CREATE TABLE projects (
project_id int primary key auto_increment,
name varchar(100) not null,
description TEXT, 
owner_id INT not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (owner_id) REFERENCES users(user_id)
)   ;

-- Create tasks table here

CREATE TABLE tasks(
task_id int primary key auto_increment,
title varchar(200) not null,
description text,
status varchar(20) default 'pending',
project_id int ,
assigned_to int null,
created_at timestamp default current_timestamp,
FOREIGN KEY (assigned_to) REFERENCES users(user_id),
FOREIGN KEY (project_id) REFERENCES projects(project_id)
);