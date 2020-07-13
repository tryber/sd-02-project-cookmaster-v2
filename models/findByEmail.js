const getSchema = require('./getSchema');

const findByEmail = async (email) => (
  getSchema().then((db) => db.collection('users').findOne({ email }))
);


module.exports = findByEmail;