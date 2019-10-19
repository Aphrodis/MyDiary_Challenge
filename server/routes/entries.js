import express from 'express';
// import Joi from 'joi';
// import controllers from '../controllers/entryControllers';
import EntryController from '../controllers/entryControllers'
const entriesRouter = express.Router();


//Get all diary entries
entriesRouter.get('/api/v1/entries', EntryController.getAllEntries);


export default entriesRouter;