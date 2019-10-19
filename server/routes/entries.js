import express from 'express';
// import Joi from 'joi';
// import controllers from '../controllers/entryControllers';
import EntryController from '../controllers/entryControllers'
const entriesRouter = express.Router();

//POST entry
entriesRouter.post('/api/v1/entries', EntryController.createEntry);



export default entriesRouter;