// @ts-ignore
import client from "../database";

// Builds TypeScript "Product"
export type Product = {
    id?: Number;
    name: string;
    price: number;
    category: string;
}

// Build Out Methods for All CRUD Actions
export class ProductStore {
    // Clears "products" Database
    async resetDatabase () {
        // @ts-ignore
        await client.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');
    }

    // Obtains List of All Items in Database
    // Method MUST Be Asynchronous Because All Calls to Database will be Promises
    async index(): Promise<Product[]> {
        // Protects from ANY ERRORS
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price, p.category])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Product | null> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}