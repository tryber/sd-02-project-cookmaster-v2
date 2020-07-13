const { authMiddleware } = require('./auth');
const errorMid = require('./errorMid');

module.exports = {
  auth: authMiddleware,
  errorMid,
};
