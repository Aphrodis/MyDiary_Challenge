import jwt from 'jsonwebtoken';
const authentication =  (req, res, next) => {
    try {
        const token= req.headers.authorization ;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Auth failed7"
        });
    }
}

export default authentication

