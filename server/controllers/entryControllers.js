/* eslint-disable radix */
import Schema from '../helpers/inputFieldsValidation';
import data from './diaryData';

const entryControllers = {};

const getAllEntries = (req, res) => {
    try {
        res.status(200).send({
            message: 'Entries retrieved successfully',
            data,
        });
    } catch (err) {
        console.log(err.details[0].message);
    }
};
const getEntry = (req, res) => {
    const entry = data.find((c) => c.id === parseInt(req.params.id));
    if (!entry) {
        return res.status(404).send({
            message: `Entry with an id of ${req.params.id} was not found`,
        });
    } else {
        return res.status(200).send({
            message: 'Entry retrieved successfully',
            entry,
        });
    }
};

const createEntry = (req, res) => {
    const { result, error } = Schema.validateEntry(req.body);
    if (error !== null) {
        res.status(400).send({ error: error.details[0].message });
    } else {
        const entry = {
            id: data.length + 1,
            createdOn: new Date(),
            title: req.body.title,
            description: req.body.description,
        };
        data.push(entry);

        return res.status(200).send({
            id: entry.id,
            message: 'Entry successfully created',
            createdOn: entry.createdOn,
            title: entry.title,
            description: entry.description,
        });
    }
};

const updateEntry = (req, res) => {
    const entry = data.find((c) => c.id === parseInt(req.params.id));
    if (!entry) {
        return res.status(404).send({
            message: `Sorry, Entry with an id of ${req.params.id} was not found`,
        });
    }

    const result = Schema.validateEntry(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    } else {
        const index = data.indexOf(entry);
        const updatedEntry = {
            id: entry.id,
            title: req.body.title || entry.title,
            updatedOn: new Date(),
            description: req.body.description || entry.description,
        };
        data.splice(index, 1, updatedEntry);
        return res.status(200).send({
            message: 'Entry successfully edited',
            updatedEntry,
        });
    }
};

const deleteEntry = (req, res) => {
    const entry = data.find((c) => c.id === parseInt(req.params.id));
    if (!entry) {
        return res.status(404).send({
            message: `Can't find the entry with an id of ${req.params.id}`,
        });
    }
    const index = data.indexOf(entry);
    data.splice(index, 1);
    return res.status(200).send({
        message: 'Entry successfully deleted',
        entry,
    });
};

entryControllers.getAllEntries = getAllEntries;
entryControllers.getEntry = getEntry;
entryControllers.createEntry = createEntry;
entryControllers.updateEntry = updateEntry;
entryControllers.deleteEntry = deleteEntry;

export default entryControllers;
