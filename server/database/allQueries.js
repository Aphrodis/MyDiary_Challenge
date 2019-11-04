import execute from './connectDB';

const queries = {};

// Create a table for entries
const createEntriesTable = `CREATE TABLE IF NOT EXISTS entries (
    id UUID PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL
)`;

const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(70) NOT NULL
)`;


if (require.main === module) {
    execute(createEntriesTable);
    execute(createUsersTable);
}


// insert entry into the database
const insertEntryIntoDatabase = 'INSERT INTO entries (id, createdOn, title, description,) VALUES($1,$2,$3,$4) RETURNING * ';

// insert user into the database
const createUser = 'INSERT INTO users (id, firstname, lastname, email, password) VALUES($1,$2,$3,$4,$5) RETURNING * ';

queries.insertEntryIntoDatabase = insertEntryIntoDatabase;
queries.createUser = createUser;
queries.createUsersTable = createUsersTable;

export default queries;
