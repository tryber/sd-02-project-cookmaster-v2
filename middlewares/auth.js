const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'mytoken';

const { JWT_SECRET } = 'mypassword123';


module.exports = {
  auth,
};
