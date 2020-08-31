const { authMiddleware } = require('./auth');
const { validateJWT } = require('./validateJWT')
const storage = require('./multerStorage');

module.exports = {
  auth: authMiddleware,
  validateJWT,
  storage,
};
