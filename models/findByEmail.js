const getSchema = require('./getSchema');

const findByEmail = async (receiveEmail) => (
  getSchema().then((db) => db.collection('users').findOne({ email: receiveEmail }))
    .then((results) => ({ ...results }))
);


module.exports = findByEmail;
