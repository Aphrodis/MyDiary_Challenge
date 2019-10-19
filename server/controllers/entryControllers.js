// import entries from '../routes/index.js';
import Schema from '../helpers/inputFieldsValidation';

import Joi from 'joi';

const data = [
    {
        id:1,
        createdOn: new Date(),
        title: "ADC",
        description: "Right now, I am working on the Andela Developer challene"
    },
    {
        id:2,
        createdOn: new Date(),
        title: "My plan for today",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum "
    },
    {
        id: 3,
        createdOn: new Date(),
        title: "Busy day",
        description: "Today, I am busy working on the second challenge of the andela developer challenge"
    }
];



class EntriesController {    
    createEntry(req, res) {
        const result = Schema.validateEntry(req.body);
        if(result.error) {
            return res.status(400).send({
                message: result.error.details[0].message,
            });
        } else {
            const entry = {
                id: data.length + 1,
                createdOn: new Date(),
                title: req.body.title,
                description: req.body.description
            }
            data.push(entry);
            return res.status(200).send({
                id: entry.id,
                message: 'entry successfully created',
                createdOn: entry.createdOn,
                title: entry.title,
                description: entry.description
                // entry
            });
        }
    } 
}

const entryController = new EntriesController();

export default entryController;
