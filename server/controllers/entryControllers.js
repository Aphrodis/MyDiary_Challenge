/* eslint-disable radix */
import uuidv4 from 'uuidv4';
import Schema from '../helpers/inputFieldsValidation';
import data from './diaryData';

const entryControllers = {};

const getAllEntries = async (req, res) => {
    const allEntries = data.filter((entryInfo) => entryInfo.userId === req.user.userId);
    try {
        if (allEntries.length === 0) {
            return res.status(404).json({
                message: 'You have not yet added any entry!',
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Entries retrieved successfully',
            allEntries,
        });
    } catch (err) {
        console.log(err);
    }
};
const getEntry = async (req, res) => {
    const allEntries = data.filter((entryInfo) => entryInfo.userId === req.user.userId);
    const entry = data.find((entryInfo) => entryInfo.id === req.params.id);
    const singleEntry = allEntries.find((entryInfo) => entryInfo.id === req.params.id);
    console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', singleEntry);
    try {
        if (!entry) {
            return res.status(404).json({
                status: 404,
                message: `Entry with an id of ${req.params.id} was not found`,
            });
        } else if (!singleEntry) {
            return res.status(404).json({
                status: 404,
                message: 'You are not allowed to view an entry that is not yours!',
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: 'Entry retrieved successfully',
                singleEntry,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const createEntry = async (req, res) => {
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
                userId: req.user.userId,
            };
            data.push(entry);
            return res.status(200).json({
                status: 200,
                id: entry.id,
                message: 'Entry successfully created',
                createdOn: entry.createdOn,
                title: entry.title,
                description: entry.description,
                userId: entry.userId,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const updateEntry = async (req, res) => {
    const allEntries = data.filter((entryInfo) => entryInfo.userId === req.user.userId);
    const entry = data.find((entryInfo) => entryInfo.id === req.params.id);
    const singleEntry = allEntries.find((entryInfo) => entryInfo.id === req.params.id);
    try {
        if (!entry) {
            return res.status(404).json({
                status: 404,
                message: `Sorry, Entry with an id of ${req.params.id} was not found`,
            });
        } else if (!singleEntry) {
            return res.status(404).json({
                status: 404,
                message: 'You are not allowed to update an entry that is not yours!',
            });
        } else {
            const result = await Schema.validateEntry(req.body);
            if (result.error) {
                return res.status(400).json({
                    status: 400,
                    message: result.error.details[0].message,
                });
            } else {
                singleEntry.title = req.body.title || singleEntry.title;
                singleEntry.description = req.body.description || singleEntry.description;

                return res.status(200).json({
                    status: 200,
                    message: 'Entry successfully edited',
                    singleEntry,
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteEntry = async (req, res) => {
    const allEntries = data.filter((entryInfo) => entryInfo.userId === req.user.userId);
    const entry = data.find((entryInfo) => entryInfo.id === req.params.id);
    const singleEntry = allEntries.find((entryInfo) => entryInfo.id === req.params.id);
    try {
        if (!entry) {
            return res.status(404).json({
                status: 404,
                message: `Can't find the entry with an id of ${req.params.id}`,
            });
        } else if (!singleEntry) {
            return res.status(404).json({
                status: 404,
                message: 'You are not allowed to delete an entry that is not yours!',
            });
        } else {
            const index = data.indexOf(singleEntry);
            data.splice(index, 1);
            return res.status(200).json({
                status: 200,
                message: 'Entry successfully deleted',
                singleEntry,
            });
        }
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
