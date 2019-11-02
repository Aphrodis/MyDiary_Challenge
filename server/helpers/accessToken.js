import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(0);

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({
                message: 'Ooops! Unauthenticated!',
            });
        }
        const token = await req.headers.authorization.split(' ')[1];
        const authorizedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.authorizedUser = authorizedUser;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Unauthenticated',
        });
    }
};
export default verifyToken;
