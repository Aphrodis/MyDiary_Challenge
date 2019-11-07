/* eslint-disable prefer-const */
import bcrypt from 'bcrypt';
// import uuidv4 from 'uuid/v4';
import uuid from 'uuid';
import Schema from '../helpers/inputFieldsValidation';
import userAuthToken from '../helpers/userAuthToken';
import pool from '../config/config';
import users from './userData';

const userControllers = {};

// create a user
const createUser = async (req, res) => {
    try {
        const user1 = req.body;
        const getEmail = 'SELECT * FROM users WHERE email=$1';
        const userid = uuid.v4();
        const values = [
            userid,
            user1.firstname,
            user1.lastname,
            user1.email,
            user1.password,
        ];
        const registerUser = 'INSERT INTO users (userid, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const user = await pool.query(getEmail, [user1.email]);
        if (user.rows[0]) {
            return res.status(409).json({
                status: 409,
                message: 'Email already exists',
            });
        } else {
            const passwordHash = await bcrypt.hash(req.body.password, 10);

            const userData = Schema.validateUserSignup(req.body);
            if (userData.error) {
                return res.status(400).json({
                    status: 400,
                    message: userData.error.details[0].message,
                });
            }
        }
        const newUser = await pool.query(registerUser, values);
        const token = userAuthToken(newUser.rows[0]);
        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            token,
        });
    } catch (err) {
        console.log(err);
    }
};

const signin = async (req, res) => {
    try {
        const user = users.find((c) => c.email === req.body.email);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Email not found',
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, users[0].password);
        if (!validPassword) {
            return res.status(401).json({
                status: 401,
                message: 'Incorrect password',
            });
        }
        const userSignInData = Schema.validateUserSignin(req.body);
        if (userSignInData.error) {
            return res.status(401).json({
                status: 401,
                message: userSignInData.error.details[0].message,
            });
        }
        const data = {
            userId: users[0].userId,
            firstname: users[0].firstname,
            lastname: users[0].lastname,
            email: users[0].email,
        };
        const token = userAuthToken(data);
        return res.status(200).json({
            status: 200,
            message: 'User logged in successfully',
            token,
        });
    } catch (err) {
        console.log(err);
    }
};

userControllers.createUser = createUser;
userControllers.signin = signin;

export default userControllers;
