import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(0);

const signAuthToken = (data) => {
    const jwtSecreteKey = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: '1d' };
    return jwt.sign(data, jwtSecreteKey, options);
};
export default signAuthToken;
