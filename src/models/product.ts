// @ts-ignore
import Client from "../database";
import jwt from "jsonwebtoken";

// Builds TypeScript "Product"
export type Product = {
    id: Number;
    name: string;
    price: number;
    category: string;
}

// Build Out Methods for All CRUD Actions
export class ProductStore {
    // Obtains List of All Items in Database
    // Method MUST Be Asynchronous Because All Calls to Database will be Promises
    async index(): Promise<Product[]> {
        // Protects from ANY ERRORS
        try {
            // @ts-ignore
            const conn = await Client.connect()
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
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE product=($1)'
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
            const conn = await Client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price, p.category])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }

    // TEMP: should I include "update" Method?

    async delete(id: string): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'DELETE FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}