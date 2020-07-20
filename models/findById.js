const getSchema = require('./getSchema');
const { ObjectId } = require('mongodb');

const findById = async ({ id }) => (
  getSchema().then((db) => db.collection('users').findOne({ _id: ObjectId(id) })
    .then(({ _id: receiveId, name, email, password, role }) =>
      ({ id: receiveId, name, email, password, role })))
);


module.exports = findById;