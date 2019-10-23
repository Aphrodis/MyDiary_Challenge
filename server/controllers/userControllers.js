import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Schema from '../helpers/inputFieldsValidation';

const users = [];
const userControllers = {};

// create a user
const createUser = (req, res) => {
    const user = users.find((c) => c.email === req.body.email);
    if (user) {
        return res.status(409).send({
            message: 'Email already exists',
        });
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(400).json({
                    // No password
                    error: err,
                });
            }
            const userData = Schema.validateUserSignup(req.body);
            if (userData.error) {
                return res.status(401).send({
                    message: userData.error.details[0].message,
                });
            }
            const data = {
                userId: users.length + 1,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
            };
            users.push(data);
            return res.status(201).send({
                // status: 201,
                message: 'User created successfully',
                userId: data.userId,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
            });
        });
    }
};

const signin = (req, res) => {
    const user = users.find((c) => c.email === req.body.email);

    if (!user) {
        return res.status(404).send({
            message: 'Email not found',
        });
    }

    bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
            return res.status(401).send({
                message: 'Incorrect password',
            });
        } else if (result) {
            const token = jwt.sign({
                email: users[0].email,
                userId: users[0].userId,
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

            return res.status(200).send({
                message: 'User logged in successfully',
                token,
            });
        } else {
            return res.status(401).send({
                message: 'The password is incorrect',
            });
        }
    });
};

// const generateToken = ()

userControllers.createUser = createUser;
userControllers.signin = signin;

export default userControllers;
