import express from 'express';
import bcrypt from 'bcrypt';
import Schema from '../helpers/inputFieldsValidation';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import userController from '../controllers/userControllers';
import { config } from 'dotenv';

config(0);

const usersRouter = express.Router();

// //Endpoints for the user

// //sign up
// usersRouter.post('/api/v1/auth/signup', userController.userSignup);
// // usersRouter.post('/api/v1/auth/signup', userController.createUser);


// //Signin
// usersRouter.post('/api/v1/auth/signin', userController.userSignin);

// export default usersRouter;

const users = [];

usersRouter.post('/api/v1/auth/signup', (req, res) =>{
    const user = users.find(c => c.email === req.body.email);
    if(user){
        return res.status(409).send({
            message: "Email already exists",
        });
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
            if(err) {
                return res.status(500).json({
                    //No password
                    error: err,
                });
            }  else {
                const userData = Schema.validateUserSignup(req.body);
                if(userData.error) {
                    return res.status(401).send({
                        message: userData.error.details[0].message,
                    });
                } else{
                    const data = {
                        userId: users.length + 1,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash
                    }
                    users.push(data);
                    return res.status(201).send({
                        message: 'User created successfully',
                        data,
                    });
                }
            }
        });
    }
});

usersRouter.post('/api/v1/auth/signin', (req, res) =>{
    const user = users.find(c => c.email === req.body.email);
    if(!user) {
        return res.status(401).send({
            message: 'Unauthorized/Wrong email',
        });
    }

    bcrypt.compare(req.body.password, users[0].password, (err, result) =>{
        if(err) {
            return res.status(401).send({
                message: 'Unauthorized/Incorrect password',
            });
        } else {
            if(result) {
                const token = jwt.sign({
                    email: users[0].email,
                    userId: users[0].userId,
                }, 
                'helloWorld',
                // process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                }
                );
                return res.status(200).send({
                    message: 'Auth successful/Logged in successfully',
                    token: token,
                });
            } else {
                return res.status(401).send({
                    message: 'Unauthorized/The password is incorrect',
                });
            }
        }
    });

});

export default usersRouter;