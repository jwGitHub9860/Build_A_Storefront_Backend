/* Holds commands for Creating Table called orders */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    productOrderId bigint REFERENCES products(id),
    quantity integer NOT NULL,
    userId bigint REFERENCES users(id),
    orderStatus VARCHAR(64) NOT NULL CHECK (status IN ('active', 'complete'))
);