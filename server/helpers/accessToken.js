import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(0);

// const authentication = async (req, res, next) => {
//     try {
//         // console.log('--------------------------------------------------------------------------------------------try');
//         const token = await req.headers.authorization.split(' ')[1];
//         // console.log('--------------------------------------------------------------------------------------------try');
//         const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.userInfo = await decodedToken;

//         next();
//     } catch (error) {
//         // console.log('--------------------------------------------------------------------------------------------catch', error);

//         return res.status(401).send({
//             message: 'Unauthenticated',
//         });
//     }
// };
// export default authentication;

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({
                message: 'Ooops! Unauthenticated!',
            });
        }
        const token = await req.headers.authorization.split(' ')[1];
        const authorizedUser = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.authorizedUser = authorizedUser;
        next();
    } catch (error) {
        // console.log('--------------------------------------------------------------------------------------------catch', error);

        return res.status(401).send({
            message: 'Unauthenticated',
        });
    }
};
export default verifyToken;
