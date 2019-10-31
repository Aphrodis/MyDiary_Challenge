import express from 'express';
import entryControllers from '../controllers/entryControllers';
import accessToken from '../helpers/accessToken';

const entriesRouter = express.Router();

entriesRouter.post('/api/v1/entries', accessToken, entryControllers.createEntry);

entriesRouter.get('/api/v1/entries', accessToken, entryControllers.getAllEntries);

entriesRouter.get('/api/v1/entries/:id', accessToken, entryControllers.getEntry);

entriesRouter.patch('/api/v1/entries/:id', accessToken, entryControllers.updateEntry);

entriesRouter.delete('/api/v1/entries/:id', accessToken, entryControllers.deleteEntry);

export default entriesRouter;
