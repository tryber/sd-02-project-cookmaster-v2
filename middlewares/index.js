//const { authMiddleware } = require('./auth');
const boomErrorHandler = require('./boomErrorHandler');
const otherErrorsHandler = require('./otherErrorsHandler');

module.exports = {
  //auth: authMiddleware,
  boomErrorHandler,
  otherErrorsHandler,
};
