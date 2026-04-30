/* Holds commands for Creating Table called orders */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId bigint REFERENCES users(id),
    orderStatus VARCHAR(64) NOT NULL CHECK (orderStatus IN ('active', 'complete'))
);