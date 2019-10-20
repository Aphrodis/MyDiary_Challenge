// import users from '../routes/entries';
import Schema from '../helpers/inputFieldsValidation';

// import Joi from 'joi';

class usersController {
    userSignup(req, res) {
        //validation
    const userData = Schema.validateUserSignup(req.body);
    if(userData.error) {
        return res.status(400).send(userData.error.details[0].message);
        // return res.status(400).send({
        //     message: 'Data entered is not valid. Please try again.',
        // })
    }   else {     
            const data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                // username:req.body.username,
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

    userSignin(req, res) {
        //validation
        const userLogin = Schema.validateUserSignin(req.body);

        if(userLogin.error) {
            return res.status(400).send(userLogin.error.details[0].message);
        } else {
            const data = {
                // username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            };
            return res.status(200).send({
                message: "User signed in successfully",
                data,
            });
        }
    }
}
// function validateUser(user) {
//     const userSchema = Joi.object().keys({
//         firstname: Joi.string().alphanum().min(4).required(),
//         lastname: Joi.string().alphanum().min(4).required(),
//         username: Joi.string().alphanum().min(4).max(19).required(),
//         email: Joi.string().trim().email( {minDomainAtoms: 2} ).required(),
//         password: Joi.string().regex(/^[a-zA-Z0-9]{6,20}$/).required(),
//         confirmPassword: Joi.any().valid(Joi.ref('password')).required()
//     });
//     return Joi.validate(user, userSchema);
// }

const userController = new usersController();

export default userController;