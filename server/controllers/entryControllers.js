// import entries from '../routes/index.js';
import Schema from '../helpers/inputFieldsValidation';
// import Entry from '../models/entry'

// import Joi from 'joi';

const data = [
    {
        id:1,
        createdOn: new Date(),
        title: "ADC",
        description: "Right now, I am working on the Andela Developer challenge"
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
    getAllEntries(req, res) {
        return res.status(200).send({
            message: 'Entries retrieved successfully',
            data,
        });
    }

    getEntry(req, res) {
        const entry = data.find(c => c.id === parseInt(req.params.id));

        if(!entry) {
            return res.status(404).send({
                message: `Entry with an id of ${req.params.id} was not found`,
            });
        } else {
            return res.status(200).send({
                message: 'Entry retrieved successfully',
                entry
            });
        }
    }


}

const entryController = new EntriesController();

export default entryController;
