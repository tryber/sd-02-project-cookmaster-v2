const getSchema = require('./getSchema');
const { ObjectId } = require('mongodb');

const updateImage = async (id, url) => (
  getSchema().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { URLimage: url } },
  ))
);


module.exports = updateImage;
