/* eslint-disable radix */
import uuidv4 from 'uuidv4';
import Schema from '../helpers/inputFieldsValidation';
import data from './diaryData';

const entryControllers = {};

const getAllEntries = (req, res) => {
    const user = req.authorizedUser;
    // data.filter()
    try {
        res.status(200).json({
            status: 200,
            message: 'Entries retrieved successfully',
            userId: user.userId,
            data,
        });
    } catch (err) {
        console.log(err);
    }
};
const getEntry = async (req, res) => {
    const user = req.authorizedUser;
    try {
        const entry = data.find((entryInfo) => entryInfo.id === req.params.id);
        if (!entry) {
            return res.status(404).json({
                status: 404,
                message: `Entry with an id of ${req.params.id} was not found`,
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: 'Entry retrieved successfully',
                userId: user.userId,
                entry,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const createEntry = async (req, res) => {
    const user = req.authorizedUser;
    try {
        const result = Schema.validateEntry(req.body);
        if (result.error) {
            return res.status(400).json({
                status: 400,
                message: result.error.details[0].message,
            });
        } else {
            const entry = {
                id: uuidv4(),
                createdOn: new Date(),
                title: req.body.title,
                description: req.body.description,
                userId: user.userId,
            };
            data.push(entry);
            return res.status(200).json({
                status: 200,
                id: entry.id,
                message: 'Entry successfully created',
                // createdOn: entry.createdOn,
                // title: entry.title,
                // description: entry.description,
                entry,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const updateEntry = async (req, res) => {
    try {
        const entry = data.find((entryInfo) => entryInfo.id === req.params.id);
        if (!entry) {
            return res.status(404).json({
                status: 404,
                message: `Sorry, Entry with an id of ${req.params.id} was not found`,
            });
        }

        const result = await Schema.validateEntry(req.body);
        if (result.error) {
            return res.status(400).json({
                status: 400,
                message: result.error.details[0].message,
            });
        } else {
            const index = data.indexOf(entry);
            const updatedEntry = {
                id: entry.id,
                createdOn: entry.createdOn,
                updatedOn: new Date(),
                title: req.body.title || entry.title,
                description: req.body.description || entry.description,
            };
            data.splice(index, 1, updatedEntry);
            return res.status(200).json({
                status: 200,
                message: 'Entry successfully edited',
                updatedEntry,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteEntry = async (req, res) => {
    try {
        const entry = data.find((entryInfo) => entryInfo.id === req.params.id);
        if (!entry) {
            return res.status(404).json({
                status: 404,
                message: `Can't find the entry with an id of ${req.params.id}`,
            });
        }
        const index = data.indexOf(entry);
        data.splice(index, 1);
        return res.status(200).json({
            status: 200,
            message: 'Entry successfully deleted',
            entry,
        });
    } catch (err) {
        console.log(err);
    }
};

entryControllers.getAllEntries = getAllEntries;
entryControllers.getEntry = getEntry;
entryControllers.createEntry = createEntry;
entryControllers.updateEntry = updateEntry;
entryControllers.deleteEntry = deleteEntry;

export default entryControllers;
