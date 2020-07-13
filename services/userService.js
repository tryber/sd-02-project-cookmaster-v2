const models = require('../models');

const register = async (name, email, password) => {
  try {
    const isNotUnique = await models.user.findByEmail(email);
    if (isNotUnique) {
      return {
        conflict: true,
        message: 'Email já está cadastrado',
      };
    }
  } catch (err) {
    return { message: err.message };
  }

  try {
    const newUser = await models.user.create(name, email, password);
    return {
      success: true,
      message: 'Novo usuário cadastrado com sucesso!',
      newUser,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

module.exports = {
  register,
};
