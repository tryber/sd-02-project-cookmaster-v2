const models = require('../models');

const register = async (name, email, password) => {
  try {
    const newUser = await models.user.create(name, email, password);
    return {
      success: true,
      message: 'Novo usuário cadastrado com sucesso!',
      newUser,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

module.exports = {
  register,
};
