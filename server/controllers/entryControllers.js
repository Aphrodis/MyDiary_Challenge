/* eslint-disable prefer-const */
/* eslint-disable radix */
import uuid from 'uuid';
import Schema from '../helpers/inputFieldsValidation';
import data from './diaryData';
import pool from '../config/config';

const entryControllers = {};

const getAllEntries = async (req, res) => {
    const allEntries = data.filter((entryInfo) => entryInfo.userId === req.user.userId);
    try {
        if (allEntries.length === 0) {
            return res.status(404).json({
                status: 404,
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
    const { userid } = req.user.rows[0];

    const entryid = uuid.v4();
    const entry = req.body;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const createdon = `${day}/${month}/${year}`;

    const addEntry = 'INSERT INTO entries (entryid, userid, createdon, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    const values = [
        entryid,
        userid,
        createdon,
        entry.title,
        entry.description,
    ];

    try {
        const newentry = await pool.query(addEntry, values);

        const result = Schema.validateEntry(req.body);
        if (result.error) {
            return res.status(400).json({
                status: 400,
                message: result.error.details[0].message,
            });
        }
        return res.status(201).json({
            status: 201,
            message: 'Entry successfully created',
            data: newentry.rows[0],
        });
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
    let {
        title,
        description,
    } = req.body;
    const { userid } = req.user.rows[0];
    let { entryid } = req.params;

    const getEntryById = 'SELECT * FROM entries WHERE entryid=$1';
    const getEntryByUserId = 'SELECT * FROM entries WHERE userid=$1';
    const entryById = await pool.query(getEntryById, [entryid]);
    const entryByUserId = await pool.query(getEntryByUserId, [userid]);

    try {
        if (!entryById.rows[0]) {
            return res.status(404).json({
                status: 404,
                message: 'Requested entry was not found',
            });
        } else if (!entryByUserId.rows[0]) {
            return res.status(404).json({
                status: 404,
                message: 'You are not allowed to delete an entry that is not yours!',
            });
        } else {
            const deleteEntryQuery = 'DELETE FROM entries WHERE entryid=$1 RETURNING *';
            const deletedEntry = await pool.query(deleteEntryQuery, [entryid]);

            return res.status(200).json({
                status: 200,
                message: 'Entry successfully deleted',
                data: deletedEntry.rows[0],
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
