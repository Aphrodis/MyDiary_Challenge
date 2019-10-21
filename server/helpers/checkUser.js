import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(0);

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);

        //I used 'helloWorld' in place of process.env.JWT_KEY (secrete key)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedToken;
        next();
    } catch(error) {
        return res.status(401).send({
            message: 'Auth failed/Unauthenticated'
        });
    }
};