// @ts-ignore
import Client from "../database";
// Build Out Methods for All CRUD Actions
export class OrderStatus {
    // Obtains List of All Items in Database
    // Method MUST Be Asynchronous Because All Calls to Database will be Promises
    async index() {
        // Protects from ANY ERRORS
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE order=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (productOrderId, quantity, userId, orderStatus) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [o.productOrderId, o.quantity, o.userId, o.orderStatus]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${o.productOrderId}. Error: ${err}`);
        }
    }
    // TEMP: should I include "update" Method?
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
