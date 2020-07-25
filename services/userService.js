const userModel = require('../models/userModel');
// const { notFound, badData, exists } = require('../middlewares/error');


// const existsCheck = async (name, id = null) => {
//   const modelCall = await userModel.findProductByName(name, id);
//   if (modelCall !== null) { return true; }
//   return false;
// };

const checkAndAdd = async ({ name, email, password }) => {
  // if (!existsCheck(name)) { return 409; }
  const findByEmail = await userModel.findByEmail(email);

  // if (!findByEmail) { throw exists; } lembrar como tratar o erro

  const addUserModel = await userModel.addUser({ name, email, password });

  return addUserModel;
};

const userLogin = async ({ email, password }) => {
  console.log('email: ', email, 'password: ', password)
  const findByEmail = await userModel.findByEmail(email);
  console.log(findByEmail)
  // if (!findByEmail) { throw exists; }; lembrar como tratar o erro
  return findByEmail.password === password;
}

module.exports = {
  checkAndAdd,
  userLogin,
}