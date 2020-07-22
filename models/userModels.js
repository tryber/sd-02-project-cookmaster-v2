const connection = require('./connections');

const createUser = async (user) => {
  try {
    const createdUser = connection()
      .then((db) => db.collection('users').insertOne(user))
      .then((result) => result.ops[0]);
    return createdUser;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = {
  createUser,
};
