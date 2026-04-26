// Provide Information that Application Needs to Connect to Postgres Database
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config()

// Reference Environment Variables INSTEAD OF Creating Constants Themselves
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env

let client
console.log(ENV)

// Ensures "client" is ALWAYS DEFINED
if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
} else {
    // Default to "dev" if ENV is missing
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}

export default client