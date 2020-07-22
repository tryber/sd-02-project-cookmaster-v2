const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  const payload =  jwt.verify(token, process.env.JWT_SECRET);
};
