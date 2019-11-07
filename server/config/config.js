import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
pool.on('connect', () => {
    console.log('Connected to the database');
});

// const connect = async () => pool.connect();

// const execute = async (sql, data = []) => {
//     const connection = await connect();
//     try {
//         const result = await connection.query(sql, data);
//         return result.rows;
//     } catch (error) {
//         // Error handling
//         console.log(error.message);
//     } finally {
//         // close the pool or the databasee
//         connection.release();
//     }
// };
export default pool;
