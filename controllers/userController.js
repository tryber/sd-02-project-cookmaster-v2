const userService = require('../services/userService');

const login = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  const token = await userService.login({ email, password });

  if (token.error) return res.status(token.code).json({ message: token.message });

  if (!token) return res.status(500).json({ message: 'Error when connecting to database' });

  return res.status(200).json({ token });
};

const newUser = async (req, res) => { };

module.exports = {
  login,
  newUser,
};
