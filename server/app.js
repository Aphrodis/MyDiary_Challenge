import express from 'express';
import bodyParser from 'body-parser';
import entriesRouter from './routes/entries';
import usersRouter from './routes/users';
// setup express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Make use of middleware
app.use(entriesRouter);
app.use(usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}...`);
});

export default app;
