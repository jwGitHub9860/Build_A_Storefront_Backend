// @ts-ignore
import Client from "../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.PASSWORD_PEPPER as string;

// Builds TypeScript "User"
export type User = {
    id?: Number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    password_digest: string
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
            const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4) RETURNING *'

            // Hashes, Salts, and Peppers "password" & Saves Hashed Password to "password_digest"
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            )

            const result = await conn.query(sql, [u.username, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
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

    // Checks if Given Password Matches "password" in Database
    async authenticate(username: string, password: string): Promise<User | null> {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])

        console.log(password+pepper)

        // Checks if User Account Exists
        if (result.rows.length) {
            const user = result.rows[0]
            console.log(user)

            // Checks if Incoming Password WITH "pepper" Matches "password_digest"
            if (bcrypt.compareSync(password+pepper, user.password_digest)) {
                return user
            }
        }
        return null
    }
}