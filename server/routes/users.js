import express from 'express';
import { config } from 'dotenv';
import usercontrollers from '../controllers/userControllers';

const usersRouter = express.Router();

config(0);

// User routes

usersRouter.post('/api/v1/auth/signup', usercontrollers.createUser);

usersRouter.post('/api/v1/auth/signin', usercontrollers.signin);

export default usersRouter;
