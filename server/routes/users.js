import express from 'express';
// import Joi from 'joi';
import userController from '../controllers/userControllers';

const usersRouter = express.Router();


//Endpoints for the user

//sign up
usersRouter.post('/api/v1/auth/signup', userController.userSignup);
// usersRouter.post('/api/v1/auth/signup', userController.createUser);


//Signin
usersRouter.post('/api/v1/auth/signin', userController.userSignin);

export default usersRouter;