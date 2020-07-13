const { authMiddleware } = require('./auth');
const { validateMiddleware } = require('./validateFields');

module.exports = {
  auth: authMiddleware,
  validateFields: validateMiddleware,
};
