import Joi from 'joi';

function validateEntry(entry) {
    const entrySchema = Joi.object().keys({
        id: Joi.string(),
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
    });
    return Joi.validate(entry, entrySchema);
} 

function validateUserSignup(user) {
    const userSchema = Joi.object().keys({
        userId: Joi.string(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().trim().email( {minDomainAtoms: 2} ).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/).required(),
    });
    return Joi.validate(user, userSchema);
}

function validateUserSignin(userSignin){
    const userSigninSchema = Joi.object().keys({
        userId: Joi.string(),
        email: Joi.string().trim().email( {minDomainAtoms: 2}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/).required(),
    });
    return Joi.validate(userSignin, userSigninSchema);
}

export default {validateEntry, validateUserSignup, validateUserSignin};
