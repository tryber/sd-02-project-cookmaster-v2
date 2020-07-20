const getSchema = require('./getSchema');
const { ObjectId } = require('mongodb');

const postDelete = async (id) => (
  getSchema().then((db) => db.collection('recipes').deleteOne(
    {
      _id: ObjectId(id)
    },
  ))
);


module.exports = postDelete;