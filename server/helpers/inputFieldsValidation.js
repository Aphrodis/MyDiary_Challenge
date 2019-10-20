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
        firstname: Joi.string().alphanum().required(),
        lastname: Joi.string().alphanum().required(),
        // username: Joi.string().alphanum().min(4).required(),
        email: Joi.string().trim().email( {minDomainAtoms: 2} ).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,35}$/).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required()
    });
    return Joi.validate(user, userSchema);
}


export default {validateEntry, validateUserSignup};


// const userSchema = Joi.object().keys({
//     firstname: Joi.string().alphanum().min(4).required(),
//     lastname: Joi.string().alphanum().min(4).required(),
//     // username: Joi.string().alphanum().min(4).required(),
//     email: Joi.string().trim().email( {minDomainAtoms: 2} ).required(),
//     password: Joi.string().regex(/^[a-zA-Z0-9]{6,35}$/).required(),
//     confirmPassword: Joi.any().valid(Joi.ref('password')).required()
// });

// export default userSchema;
