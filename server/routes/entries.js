import express from 'express';
import entryControllers from '../controllers/entryControllers';
import checkUser from '../helpers/checkUser';

const entriesRouter = express.Router();

entriesRouter.post('/api/v1/entries', checkUser, entryControllers.createEntry);

entriesRouter.get('/api/v1/entries', checkUser, entryControllers.getAllEntries);

entriesRouter.get('/api/v1/entries/:id', checkUser, entryControllers.getEntry);

entriesRouter.patch('/api/v1/entries/:id', checkUser, entryControllers.updateEntry);

entriesRouter.delete('/api/v1/entries/:id', checkUser, entryControllers.deleteEntry);

export default entriesRouter;
