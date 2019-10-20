import express from 'express';
// import Joi from 'joi';
// import controllers from '../controllers/entryControllers';
import EntryController from '../controllers/entryControllers'
const entriesRouter = express.Router();

//POST entry
entriesRouter.post('/api/v1/entries', EntryController.createEntry);

//Get all diary entries
entriesRouter.get('/api/v1/entries', EntryController.getAllEntries);

//Get a single entry
entriesRouter.get('/api/v1/entries/:id', EntryController.getEntry);

//Modify an entry
entriesRouter.patch('/api/v1/entries/:id', EntryController.updateEntry);

//Delete a single entry
entriesRouter.delete('/api/v1/entries/:id', EntryController.deleteEntry);


export default entriesRouter;