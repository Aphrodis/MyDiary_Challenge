import express from 'express';
import User from '../models/user';
const usersRouter = express.Router();
import { config } from 'dotenv';
import usercontrollers from '../controllers/userControllers'

config(0);

//User routes

usersRouter.post('/api/v1/auth/signup', usercontrollers.createUser);

usersRouter.post('/api/v1/auth/signin', usercontrollers.signin);

export default usersRouter;