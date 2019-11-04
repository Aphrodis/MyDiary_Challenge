import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import Schema from '../helpers/inputFieldsValidation';
import users from './userData';
import userAuthToken from '../helpers/userAuthToken';
import queries from '../database/allQueries';
import execute from '../database/connectDB';

const userControllers = {};

// create a user
const createUser = async (req, res) => {
    try {
        const user = users.find((c) => c.email === req.body.email);
        if (user) {
            return res.status(409).json({
                status: 409,
                message: 'Email already exists',
            });
        } else {
            // hash the password
            const passwordHash = await bcrypt.hash(req.body.password, 10);

            const userData = Schema.validateUserSignup(req.body);
            if (userData.error) {
                return res.status(400).json({
                    status: 400,
                    message: userData.error.details[0].message,
                });
            }
            const newUser = {
                userId: uuidv4(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: passwordHash,
            };
            // users.push(newUser);
            const userResponse = execute(queries.createUser, [
                newUser.userId,
                newUser.firstname,
                newUser.lastname,
                newUser.email,
                newUser.password,
            ]);
            const authenticate = {
                userId: newUser.userId,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
            };
            const token = userAuthToken(authenticate);
            return res.status(201).json({
                message: 'User created successfully',
                response: {
                    status: 201,
                    userResponse,
                    token,
                },

                // status: 201,
                // message: 'User created successfully',
                // userId: newUser.userId,
                // firstname: newUser.firstname,
                // lastname: newUser.lastname,
                // email: newUser.email,
                // token,
            });
        }
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
