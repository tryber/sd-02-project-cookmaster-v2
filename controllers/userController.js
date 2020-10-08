const userService = require('../services/userService');

function validateNewUserData({ email, name, password }) {
  const validEmail = email && /\S+@\S+[.][0-9a-z]+/.test(email) && typeof email === 'string';
  const validName = name && typeof name === 'string';
  const validPassword = password && typeof password === 'string';
  if (!validEmail || !validName || !validPassword) return false;
  return true;
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  const token = await userService.login({ email, password });

  if (token.error) return res.status(token.code).json({ message: token.message });

  if (!token) return res.status(500).json({ message: 'Error when generating token' });

  return res.status(200).json({ token });
};

const newUser = async (req, res) => {
  const { email, name, password } = req.body;
  const role = 'user';

  const isDataValid = validateNewUserData({ email, name, password });

  if (!isDataValid) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const user = await userService.createNewUser({ email, name, password, role });

  if (user.error) return res.status(user.code).json({ message: user.message });

  if (!user) return res.status(500).json({ message: 'Error when creating new user' });

  return res.status(201).json({ user });
};

const newAdmin = async (req, res) => {
  const { email, name, password } = req.body;
  const { _id: userId } = req.user;
  const role = 'admin';

  const isDataValid = validateNewUserData({ email, name, password });

  if (!isDataValid) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const user = await userService.createNewAdmin({ email, name, password, role, userId });

  if (user.error) return res.status(user.code).json({ message: user.message });

  if (!user) return res.status(500).json({ message: 'Error when creating new admin' });

  return res.status(201).json({ user });
};

module.exports = {
  login,
  newUser,
  newAdmin,
};
