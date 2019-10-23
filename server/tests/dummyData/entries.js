const entryData = {};

const validEntry = {
    title: 'my title',
    description: 'put entry content here',
};
const invalidEntry = {
    title: 'another title',
    description: '',
};
const invalidToken = 'thistokenisnotvalid';

const updateEntry = {
    title: 'Busy day updated',
    description: 'Put the content here',
};
const retrieveOneEntry = {
    id: 4,
    createdOn: '2019-10-22T21:56:01.550Z',
    title: 'Retrieve',
    description: 'This entry should be retrieved',
};
const invalidId = 'id';
const nonExistentId = 56;
const validId = 1;

entryData.validEntry = validEntry;
entryData.invalidEntry = invalidEntry;
entryData.invalidToken = invalidToken;
entryData.updateEntry = updateEntry;
entryData.retrieveOneEntry = retrieveOneEntry;
entryData.invalidId = invalidId;
entryData.nonExistentId = nonExistentId;
entryData.validId = validId;
export default entryData;
