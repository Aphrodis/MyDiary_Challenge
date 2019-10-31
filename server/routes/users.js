import express from 'express';
import usercontrollers from '../controllers/userControllers';

const usersRouter = express.Router();

usersRouter.post('/api/v1/auth/signup', usercontrollers.createUser);

usersRouter.post('/api/v1/auth/signin', usercontrollers.signin);

export default usersRouter;
