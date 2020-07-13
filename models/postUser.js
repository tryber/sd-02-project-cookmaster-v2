const getSchema = require('./getSchema');

const postUser = async (infos) => (
  getSchema().then((db)=> db.collection('users').insertOne(infos))
);


module.exports = postUser;