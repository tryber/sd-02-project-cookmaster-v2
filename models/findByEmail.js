const getSchema = require('./getSchema');

const findByEmail = async (receiveEmail) => (
  getSchema().then((db) => db.collection('users').findOne({ email: receiveEmail }))
    .then(({ _id: id, name, email, password, role }) => ({ id, name, email, password, role }))
);


module.exports = findByEmail;
