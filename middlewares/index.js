const auth = require('./auth');
const boomErrorHandler = require('./boomErrorHandler');
const otherErrorsHandler = require('./otherErrorsHandler');
const fieldsValidator = require('./fieldsValidator');

module.exports = {
  auth,
  boomErrorHandler,
  otherErrorsHandler,
  fieldsValidator,
};
