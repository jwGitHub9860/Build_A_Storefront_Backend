/* Holds commands for Creating Table called users */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(64) NOT NULL,
    lastName VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    password_digest VARCHAR NOT NULL
);