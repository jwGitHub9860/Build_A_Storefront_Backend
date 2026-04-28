// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";

// Builds TypeScript "User"
export type User = {
    id?: Number,
    firstName: string,
    lastName: string,
    username: string,
    password?: string,
    password_digest?: string
}

// Build Out Methods for All CRUD Actions
export class UserStore {
    // Clears "users" Database
    async resetDatabase() {
        // @ts-ignore
        await client.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    }

    // Obtains List of All Items in Database
    // Method MUST Be Asynchronous Because All Calls to Database will be Promises
    async index(): Promise<User[]> {
        // Protects from ANY ERRORS
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
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
            const conn = await client.connect()
            const sql = `INSERT INTO users (firstName, lastName, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *`

            // Adds Protective Measures to Ensure No One Can Take Stolen Password & Use it in Application
            const hash = bcrypt.hashSync(
                // ! - Defines "process.env.PASSWORD_PEPPER" & "process.env.SALT_ROUNDS" AS undefined
                u.password + process.env.PASSWORD_PEPPER!,
                parseInt(process.env.SALT_ROUNDS!)
            )

            // Saves Hashed Password to "password_digest" WHILE Creating New User
            const result = await conn.query(sql, [u.firstName, u.lastName, u.username, hash])
            
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<User | null> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            // Delete DEPENDENT "orders" FIRST
            await conn.query('DELETE FROM orders WHERE userId=($1) RETURNING *', [id])

            // Delete "user"
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
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
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])

        // Checks if User Account Exists
        if (result.rows.length) {
            const user = result.rows[0]
            console.log(user)

            // Checks if Incoming Password WITH "pepper" Matches "password_digest"
            if (bcrypt.compareSync(password+(process.env.PASSWORD_PEPPER as string), user.password_digest)) {
                return user
            }
        }
        return null
    }

    // Attaches "order" to "user"
    async addOrder(quantity: number, orderId: string, userId: string): Promise<User> {
        // Obtains "user" to See if User Exists
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [userId])
            const user = result.rows[0]
            if (user.id === null) {
                throw new Error(`Could not add order ${orderId} to user ${userId} because user does not exist ${user.id}`);
            }
            conn.release()
        } catch (err) {
            throw new Error(`Could not add order ${orderId} to user ${userId}: ${err}`);
        }

        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO user_orders (quantity, orderId, userId) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [quantity, orderId, userId])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add order ${orderId} to user ${userId}: ${err}`);
        }
    }
}