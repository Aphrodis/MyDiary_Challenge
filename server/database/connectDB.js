import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});

const connect = async () => pool.connect();

const execute = async (query, data = []) => {
    const connection = await connect();
    try {
        const result = await connection.query(query, data);
        return result.rows;
    } catch (error) {
        // Return error
        console.log(error.message);
    } finally {
        connection.release();
    }
};

export default execute;
