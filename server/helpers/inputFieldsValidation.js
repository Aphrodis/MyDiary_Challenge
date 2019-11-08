import Joi from 'joi';

const validateEntry = (entry) => {
    const entrySchema = Joi.object({
        entryid: Joi
            .string(),
        title: Joi
            .any(),
        description: Joi
            .any(),
    }).or('title', 'description');
    return Joi.validate(entry, entrySchema);
};

const validateUserSignup = (user) => {
    const userSchema = Joi.object({
        userId: Joi
            .string(),
        firstname: Joi
            .string()
            .required(),
        lastname: Joi
            .string()
            .required(),
        email: Joi
            .string()
            .trim()
            .email({ minDomainAtoms: 2 })
            .required(),
        password: Joi
            .string()
            .regex(/^[a-zA-Z0-9]{8,32}$/)
            .required(),
    });
    return Joi.validate(user, userSchema);
};
const validateUserSignin = (userSignin) => {
    const userSigninSchema = Joi.object({
        email: Joi
            .string()
            .trim()
            .email({ minDomainAtoms: 2 })
            .required(),
        password: Joi
            .string()
            .regex(/^[a-zA-Z0-9]{8,32}$/)
            .required(),
    });
    return Joi.validate(userSignin, userSigninSchema);
};

export default { validateEntry, validateUserSignup, validateUserSignin };
