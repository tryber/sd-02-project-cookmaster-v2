const getSchema = require('./getSchema');
const { ObjectId } = require('mongodb');

const findById = async ({ _id: id }) => (
  getSchema().then((db) => db.collection('users').findOne({ _id: ObjectId(id) }))
);


module.exports = findById;