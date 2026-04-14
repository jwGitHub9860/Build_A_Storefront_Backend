// @ts-ignore
import Client from "../database";
import jwt from "jsonwebtoken";

// Builds TypeScript "User"
export type User = {
    id: Number,
    firstName: string,
    lastName: string,
    password: string
}

// Build Out Methods for All CRUD Actions
export class UserStore {
    // Obtains List of All Items in Database
    // Method MUST Be Asynchronous Because All Calls to Database will be Promises
    async index(): Promise<User[]> {
        // Protects from ANY ERRORS
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }

    async show(id: string): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE user=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [u.firstName, u.lastName, u.password])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
        }
    }

    // TEMP: should I include "update" Method?

    async delete(id: string): Promise<User> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${id}. Error: ${err}`);
        }
    }
}