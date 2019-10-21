import express from 'express';
import bcrypt from 'bcrypt';
import Schema from '../helpers/inputFieldsValidation';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import userController from '../controllers/userControllers';

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
    // const user = Object.values(User.email === req.body.email);
    const user = users.find(c => c.email === req.body.email);
    if(user){
        return res.status(409).send({
            message: "Email already exists",
        });
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
            if(err) {
                return res.status(500).json({
                    //this failed. we don't have a password
                    error: err,
                });
            }  else {
                const userData = Schema.validateUserSignup(req.body);
                // const result = Schema.validateEntry(req.body);
                if(userData.error) {
                    return res.status(401).send({
                        message: userData.error.details[0].message,
                    });
                } else{
                    const data = {
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
            
                
                // .catch((err) =>{
                //     console.log(err);
                //     res.status(500).json({
                //         error: err,
                //     });
                // });
            }
        });
    }
});

usersRouter.delete('/api/v1/auth/:id', (req, res) =>{
    const deleteUser = users.find(c => c.id === req.params.id);
    if(deleteUser){
        return res.status(200).send({
            message: 'User deleted',
        })
    } else {
        return res.status(404).send({
            message: `Can't find the entry with an id of ${req.params.id}`,
        });
    }
});

export default usersRouter;