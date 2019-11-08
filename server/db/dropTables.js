import pool from '../config/config';

const dropTables = async () => {
    const deleteEntriesTable = 'DROP TABLE IF EXISTS entries';
    try {
        return await pool.query(deleteEntriesTable);
    } catch (err) {
        console.log(err);
    }
    const deleteusersTable = 'DROP TABLE IF EXISTS users';
    try {
        return await pool.query(deleteusersTable);
    } catch (err) {
        console.log(err);
    }
};
dropTables();
require('make-runnable');
