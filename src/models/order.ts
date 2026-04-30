// @ts-ignore
import client from "../database";

// Builds TypeScript "Order"
export type Order = {
    id?: Number;
    userId?: Number;
    orderStatus: string;
}

// Build Out Methods for All CRUD Actions
export class OrderStore {
    // Clears "orders" Database
    async resetDatabase() {
        // @ts-ignore
        await client.query('TRUNCATE TABLE orders RESTART IDENTITY CASCADE');
    }

    // Obtains List of All Items in Database
    // Method MUST Be Asynchronous Because All Calls to Database will be Promises
    async index(): Promise<Order[]> {
        // Protects from ANY ERRORS
        try {
            // @ts-ignore
            const conn = await client.connect()
            
            // Specifies "id", "userId", and "orderStatus"
            // PREVENTS "order" Model Test ERRORS
            const sql = `
                SELECT id, userid as "userId", orderstatus as "orderStatus"
                FROM orders
            `

            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            
            // Specifies "id", "userId", and "orderStatus"
            // PREVENTS "order" Model Test ERRORS
            const sql = `
                SELECT id, userid as "userId", orderstatus as "orderStatus"
                FROM orders
                WHERE id=($1)
            `
            
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order | null> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            // Checks if Chosen User ID Exists in "users" Database BEFORE CREATING "order"
            const userIdSql = 'SELECT id FROM users WHERE id=($1)'
            const userIdResult = await conn.query(userIdSql, [o.userId])

            // Checks if User Account Exists
            if (!userIdResult.rows.length) {
                conn.release()
                throw new Error(`User ID ${o.userId} does not exist`);
            }

            // Specifies "id", "userId", and "orderStatus"
            // PREVENTS "order" Model Test ERRORS
            const sql = `
                INSERT INTO orders (userId, orderStatus)
                VALUES ($1, $2)
                RETURNING id, userid as "userId", orderstatus as "orderStatus"
            `
            const result = await conn.query(sql, [o.userId, o.orderStatus])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.orderStatus}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Order | null> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            
            // Specifies "id", "userId", and "orderStatus"
            // PREVENTS "order" Model Test ERRORS
            const sql = `
                DELETE FROM orders
                WHERE id=($1)
                RETURNING id, userid as "userId", orderstatus as "orderStatus"
            `
            
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }

    // Attaches "product" to "order"
    async addProduct(orderId: string, productId: string, quantity: number): Promise<Order> {
        // @ts-ignore
        const conn = await client.connect()

        // Checks if "product" Exists
        try {
            const productSql = 'SELECT id FROM products WHERE id=($1)'
            const result = await conn.query(productSql, [productId])
            if (!result.rows.length) {
                throw new Error(`Product ID ${productId} does not exist`);
            }
        } catch (err) {
            throw new Error(`Could not attach product ${productId} to order ${orderId}: ${err}`);
        }

        // Obtains "order" to Check if it is "active" (open)
        try {
            // Specifies "id", "userId", and "orderStatus"
            // PREVENTS Postman ERRORS
            const orderSql = `
                SELECT id, userid as "userId", orderstatus as "orderStatus"
                FROM orders
                WHERE id=($1)
            `
            
            const result = await conn.query(orderSql, [orderId]);
            const order = result.rows[0]

            if (!order) {
                throw new Error(`Order ${orderId} does not exist`);
            }

            if (order.orderStatus !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.orderStatus}`);
            }
        } catch (err) {
            throw new Error(`${err}`);
        }

        try {
            const sql = `
                INSERT INTO order_products (orderId, productId, quantity)
                VALUES ($1, $2, $3)
                RETURNING id, orderid as "orderId", productid as "productId", quantity as "quantity"
            `
            const result = await conn.query(sql, [orderId, productId, quantity])
            const order = result.rows[0]
            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        } finally {
            conn.release()
        }
    }
}