// import users from '../routes/entries';
import Schema from '../helpers/inputFieldsValidation';

// import Joi from 'joi';

class usersController {
    userSignup(req, res) {
        //validation
    const userData = Schema.validateUserSignup(req.body);
    if(userData.error) {
        return res.status(400).send(userData.error.details[0].message);
    }   else {     
            const data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
            };
            return res.status(201).send({
                message: 'User created successfully',
                data,
            });        
        }
    }
}
const userController = new usersController();

export default userController;