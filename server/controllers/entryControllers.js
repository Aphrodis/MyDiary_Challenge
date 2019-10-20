import Schema from '../helpers/inputFieldsValidation';

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

    createEntry(req, res) {
        // console.log('req', req.userData);
        const result = Schema.validateEntry(req.body);
        if(result.error) {
            return res.status(401).send({
                message: result.error.details[0].message,
            });
        } else {
            // const entry = new Entry({
            //     id: data.length + 1,
            //     createdOn: req.body.createdOn,
            //     title: req.body.title,
            //     description: req.body.description
            // });
            const entry = {
                id: data.length + 1,
                createdOn: new Date(),
                title: req.body.title,
                // owner:req.userData.email,
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

    updateEntry(req, res) {
        //validation
        const entry = data.find(c => c.id === parseInt(req.params.id));

        if(!entry) {
            return res.status(404).send({
                message: `Sorry, Entry with an id of ${req.params.id} was not found`,
            });
        }

        const result = Schema.validateEntry(req.body);
        if(result.error) {
            return res.status(400).send(result.error.details[0].message)
        }

        const index = data.indexOf(entry);
        const updatedEntry = {
            id: entry.id,
            title: req.body.title || entry.title,
            updatedOn: new Date(),
            description: req.body.description || entry.description,
        };
        data.splice(index, 1, updatedEntry);
        return res.status(201).send({
            message: 'Entry successfully edited',
            updatedEntry,
        });
    }

    deleteEntry(req, res) {
        const entry = data.find(c => c.id === parseInt(req.params.id));

        if(!entry) {
            return res.status(404).send({
                message: `Can't find the entry with an id of ${req.params.id}`,
            });
        }

        //Delete
        const index = data.indexOf(entry);
        data.splice(index, 1);
        return res.status(200).send({
            message: 'Entry successfully deleted',
            entry,
        });
    } 
}

const entryController = new EntriesController();

export default entryController;
