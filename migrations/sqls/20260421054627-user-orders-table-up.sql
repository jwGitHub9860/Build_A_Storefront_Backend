/* Holds commands for Creating Table called user_orders */
CREATE TABLE user_orders (
    id SERIAL PRIMARY KEY,
    quantity integer,
    orderId bigint REFERENCES orders(id),
    userId bigint REFERENCES users(id)
);