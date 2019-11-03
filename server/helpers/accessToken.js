import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import users from '../controllers/userData';

config(0);

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            status: 401,
            message: 'Ooops! Unauthenticated!',
        });
    }
    const token = await req.headers.authorization.split(' ')[1];
    const authorizedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userExists = users.find((el) => el.userId === authorizedUser.userId);
    if (!userExists) {
        return res.status(401).send({
            status: 401,
            message: 'The user with this token was not found',
        });
    }
    req.user = userExists;
    next();
};
export default verifyToken;
