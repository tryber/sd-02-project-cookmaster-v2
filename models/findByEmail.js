const getSchema = require('./getSchema');

const findByEmail = async (email) => (
  getSchema().then((db) => db.collection('users').findOne({ email }))
    .then(({ _id: id, name, email, password, role }) => ({ id, name, email, password, role }))
);


module.exports = findByEmail;