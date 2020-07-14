const userService = require('../services/userService');

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

  const validEmail = email && /\S+@\S+[.][0-9a-z]+/.test(email) && typeof email === 'string';
  const validName = name && typeof name === 'string';
  const validPassword = password && typeof password === 'string';

  if (!validEmail || !validName || !validPassword) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const user = await userService.createNewUser(req.body);

  if (user.error) return res.status(user.code).json({ message: user.message });

  if (!user) return res.status(500).json({ message: 'Error when creating new user' });

  return res.status(201).json({ user });
};

module.exports = {
  login,
  newUser,
};
