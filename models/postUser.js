const getSchema = require('./getSchema');

const postUser = async (infos) => (
  getSchema().then((db) => db.collection('users').insertOne(infos))
    .then(({ ops }) => ops[0])
);


module.exports = postUser;
