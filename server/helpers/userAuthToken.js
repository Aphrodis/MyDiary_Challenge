import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(0);

const signAuthToken = (user) => {
    const jwtSecreteKey = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: '6d' };
    return jwt.sign(user, jwtSecreteKey, options);
};
export default signAuthToken;
