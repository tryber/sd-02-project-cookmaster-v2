const userModel = require('../models/userModel');
// const { notFound, badData, exists } = require('../middlewares/error');


// const existsCheck = async (name, id = null) => {
//   const modelCall = await userModel.findProductByName(name, id);
//   if (modelCall !== null) { return true; }
//   return false;
// };

const checkAndAdd = async ({ name, email, password, role }) => {
  const findByEmail = await userModel.findByEmail(email);
  // if (!findByEmail) { throw exists; } lembrar como tratar o erro (olhar store manager)
  // if (!existsCheck(name)) { return 409; }
  const addUserModel = await userModel.addUser({ name, email, password, role });

  return addUserModel;
};

const userLogin = async ({ email, password }) => {
  const findByEmail = await userModel.findByEmail(email);
  // if (!findByEmail) { throw exists; }; lembrar como tratar o erro
  return findByEmail.password === password;
}

module.exports = {
  checkAndAdd,
  userLogin,
}