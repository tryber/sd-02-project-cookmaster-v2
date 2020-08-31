const { authMiddleware } = require('./auth');
const { validateJWT } = require('./validateJWT')

module.exports = {
  auth: authMiddleware,
  validateJWT,
};
