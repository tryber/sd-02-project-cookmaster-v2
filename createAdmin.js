const connection = require('./models/connection');
const bcrypt = require('bcrypt');
const { FailedToSave } = require('./services/errorObjects');

const createAdmin = async() => {
  const saltRounds = process.env.SALT_ROUNDS;
  const adminPass = process.env.ADMIN_PASS

  bcrypt.genSalt(Number(saltRounds), function (err, salt) {
    bcrypt.hash(adminPass, salt, function (err, hash) {
      connection().then(
        (db) => db.collection('users')
          .insertOne({
            email: 'root@email.com',
            name: 'admin',
            password: hash,
            role: 'admin'
          }))
        .catch((err) => {
          throw new FailedToSave;
        });
      });
    });
};

module.exports = {
  createAdmin,
}