const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '60m',
  algorithm: 'HS256'
};

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json(false);

  const user = await User.getByEmail(email)
  
  if (!user) return res.status(401).send('email inexistente');

  if (user.password !== password) return res.status(401).send('Senha incorreta');

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign({ data: userWithoutPassword }, JWT_SECRET, jwtConfig);

  res.status(200).json({ token });
});

const register = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(401).send('Nome, email e senha devem ser passados');
  
  if (await User.getByEmail(email))
    return res.status(409).send('Email já cadastrado')
  
  const newUser = new User(name, email, password);
  const response = await newUser.add();
  return res.status(201).send(response);
});

module.exports = {
  login,
  register,
};
