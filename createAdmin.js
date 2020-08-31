const connection = require('./models/connection');
const bcrypt = require('bcrypt');
const userModel = require('./models/userModel');
const { FailedToSave, UserAlreadyExists } = require('./services/errorObjects');

const createAdmin = async(userData = null) => {
  const { email, name } = userData ? userData : { email: null, name: null};
  const saltRounds = process.env.SALT_ROUNDS;
  const adminPass = process.env.ADMIN_PASS

  const doesUserExists = await userModel.findByEmail(email);
  if (doesUserExists) throw new UserAlreadyExists;

  bcrypt.genSalt(Number(saltRounds), function (err, salt) {
    bcrypt.hash(adminPass, salt, async function (err, hash) {

      await connection().then(
        (db) => db.collection('users')
          .insertOne({
            email: email || 'root@email.com',
            name: name || 'admin',
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