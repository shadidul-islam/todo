drop database if exists todo;
create database todo;
use todo;

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

INSERT INTO task (description) VALUES ('My test task');
INSERT INTO task (description) VALUES ('My another test task');