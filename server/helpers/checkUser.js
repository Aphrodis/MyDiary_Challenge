import jwt from 'jsonwebtoken';

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);

        //I used 'helloWorld' in place of process.env.JWT_KEY (secrete key)
        const decodedToken = jwt.verify(token, 'helloWorld');
        req.userInfo = decodedToken;
        next();
    } catch(error) {
        return res.status(401).send({
            message: 'Auth failed/Unauthenticated'
        });
    }
};