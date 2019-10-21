import express from 'express';
import entryControllers from '../controllers/entryControllers'
import checkUser from '../helpers/checkUser';
const entriesRouter = express.Router();

//POST entry
entriesRouter.post('/api/v1/entries',checkUser, entryControllers.createEntry);

//Get all diary entries
entriesRouter.get('/api/v1/entries', entryControllers.getAllEntries);

//Get a single entry
entriesRouter.get('/api/v1/entries/:id', entryControllers.getEntry);

//Modify an entry
entriesRouter.patch('/api/v1/entries/:id', checkUser, entryControllers.updateEntry);

//Delete a single entry
entriesRouter.delete('/api/v1/entries/:id', checkUser, entryControllers.deleteEntry);

export default entriesRouter;