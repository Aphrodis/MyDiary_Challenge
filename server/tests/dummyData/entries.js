import uuid from 'uuid';

const entryData = {};

const validEntry = {
    // entryid: uuid.v4(),
    // createdOn: new Date(),
    title: 'my title',
    description: 'put entry content here',
};
const invalidEntry = {
};
const invalidToken = 'thistokenisnotvalid';

const updateEntry = {
    title: 'Busy day updated',
    description: 'Put the content here',
};
// const userid = uuid.v4();
const retrieveOneEntry = {
    userid: uuid.v4(),
    createdOn: '2019-10-22T21:56:01.550Z',
    title: 'Retrieve',
    description: 'This entry should be retrieved',
};
const invalidId = 'id';
const nonExistentId = '11445acf-50b4-4b22-b59e-0acb6ee291a3';
const entryid = '11445acf-50b4-4b22-b59e-0acb6ee291a3';

entryData.validEntry = validEntry;
entryData.invalidEntry = invalidEntry;
entryData.invalidToken = invalidToken;
entryData.updateEntry = updateEntry;
entryData.retrieveOneEntry = retrieveOneEntry;
entryData.invalidId = invalidId;
entryData.nonExistentId = nonExistentId;
entryData.entryid = entryid;
export default entryData;
