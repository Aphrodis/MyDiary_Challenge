import Joi from 'joi';

function validateEntry(entry) {
    const entrySchema = Joi.object().keys({
        id: Joi.string(),
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
    });
    return Joi.validate(entry, entrySchema);
} 

export default validateEntry;
