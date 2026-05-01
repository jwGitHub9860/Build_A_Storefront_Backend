/* Holds commands for Creating Table called order_products */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    orderId bigint REFERENCES orders(id),
    productId bigint REFERENCES products(id),
    quantity integer NOT NULL
);