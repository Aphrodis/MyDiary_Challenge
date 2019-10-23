import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(0);

const authentication = (req, res, next) => {
    try {
        // console.log('--------------------------------------------------------------------------------------------try');
        const token = req.headers.authorization.split(' ')[1];
        // console.log('--------------------------------------------------------------------------------------------try');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedToken;

        next();
    } catch (error) {
        // console.log('--------------------------------------------------------------------------------------------catch', error);

        return res.status(401).send({
            message: 'Unauthenticated',
        });
    }
};
export default authentication;
