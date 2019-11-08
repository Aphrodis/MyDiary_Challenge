import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
// import users from '../controllers/userData';
// import pool from '../config/config';

config(0);

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({
                status: 401,
                message: 'Ooops! Unauthenticated!',
            });
        }
        const token = await req.headers.authorization.split(' ')[1];
        const authorizedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.authorizedUser = authorizedUser;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Not authorized',
        });
    }
};
export default verifyToken;
