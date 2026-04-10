/* Holds commands for Creating Table called orders */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    productOrderId SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    userId SERIAL PRIMARY KEY,
    orderStatus VARCHAR(64) NOT NULL CHECK (status IN ('active', 'complete'))
);