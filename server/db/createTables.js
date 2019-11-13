import pool from '../config/config';

const allTables = `DROP TABLE IF EXISTS users, entries CASCADE;
    CREATE TABLE users (      
    userid UUID NOT NULL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
      
    );
    CREATE TABLE entries (
        entryid UUID PRIMARY KEY,
        userid VARCHAR NOT NULL,
        createdon TIMESTAMP DEFAULT NOW(),
        title TEXT,
        description TEXT
    ); `;
const createTables = async () => {
    try {
        await pool.query(allTables);
        console.log('Created tables successfully');
    } catch (err) {
        console.log(err);
    }
};
createTables();

// require('make-runnable');
