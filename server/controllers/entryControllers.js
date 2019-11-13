/* eslint-disable prefer-const */
/* eslint-disable radix */
import uuid from 'uuid';
import Schema from '../helpers/inputFieldsValidation';
// import data from './diaryData';
import pool from '../config/config';

const entryControllers = {};

const getAllEntries = async (req, res) => {
    // const { userid } = req.user.rows[0];
    const { userid } = req.authorizedUser;
    const allEntries = 'SELECT * FROM entries WHERE userid=$1;';
    const entries = await pool.query(allEntries, [userid]);
    try {
        const pageNo = req.query.pageNo ? parseInt(req.query.pageNo) : 1;

        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = pageSize * pageNo;

        const totalEntries = entries.rows.length;
        const totalPages = Math.ceil(totalEntries / pageSize);
        let retrievedEntries = entries.rows.slice(startIndex, endIndex);

        const itemsOnPage = retrievedEntries.length;


        if (allEntries.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'You have not yet added any entry!',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Entries retrieved successfully',
            totalEntries,
            totalPages,
            itemsOnPage,
            pageNo,
            retrievedEntries,
        });
    } catch (err) {
        console.log(err);
    }
};

const getEntry = async (req, res) => {
    // const { userid } = req.user.rows[0];
    const { userid } = req.authorizedUser;
    let { entryid } = req.params;

    const getEntryById = 'SELECT * FROM entries WHERE entryid=$1';
    const getEntryByUserId = 'SELECT * FROM entries WHERE userid=$1';
    const entryById = await pool.query(getEntryById, [entryid]);
    const entryByUserId = await pool.query(getEntryByUserId, [userid]);

    try {
        if (!entryById.rows[0]) {
            return res.status(404).json({
                status: 404,
                message: 'Entry not found!!',
            });
        } else if (!entryByUserId.rows[0]) {
            return res.status(404).json({
                status: 404,
                message: 'You are not allowed to view an entry that is not yours!',
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: 'Entry retrieved successfully',
                retrievedEntry: entryById.rows[0],
            });
        }
    } catch (err) {
        console.log(err);
    }
};


const createEntry = async (req, res) => {
    try {
        // const { userid } = req.user.rows[0];
        const { userid } = req.authorizedUser;

        const entryid = uuid.v4();
        const entry = req.body;
        // const date = new Date();
        // const day = date.getDate();
        // const month = date.getMonth();
        // const year = date.getFullYear();
        // const createdon = `${day}/${month}/${year}`;
        const createdon = new Date();

        const addEntry = 'INSERT INTO entries (entryid, userid, createdon, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *';

        const values = [
            entryid,
            userid,
            createdon,
            entry.title,
            entry.description,
        ];
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
    // const { userid } = req.user.rows[0];
    const { userid } = req.authorizedUser;
    let { entryid } = req.params;

    const getEntryById = 'SELECT * FROM entries WHERE entryid=$1';
    const getEntryByUserId = 'SELECT * FROM entries WHERE userid=$1';
    const entryById = await pool.query(getEntryById, [entryid]);
    const entryByUserId = await pool.query(getEntryByUserId, [userid]);
    try {
        if (!entryById.rows[0]) {
            return res.status(404).json({
                status: 404,
                message: 'Entry was not found',
            });
        } else if (!entryByUserId.rows[0]) {
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
                const updateOneEntry = `UPDATE entries
                SET title=$1,description=$2 WHERE entryid=$3 RETURNING *`;
                const values = [
                    req.body.title || entryById.rows[0].title,
                    req.body.description || entryById.rows[0].description,
                    entryById.rows[0].entryid,
                ];
                const editedEntry = await pool.query(updateOneEntry, values);
                const updatedEntry = editedEntry.rows[0];
                return res.status(200).json({
                    status: 200,
                    message: 'Entry successfully edited',
                    updatedEntry,
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};
const deleteEntry = async (req, res) => {
    const { userid } = req.authorizedUser;
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
