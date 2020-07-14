const boom = require('boom');

const fieldsValidator = (fields) => async (req, _res, next) => {
  const data = fields.map((field) => req.body[field]);

  let invalidField = '';
  let i = 0;

  while (!invalidField && i < fields.length) {
    if (typeof data[i] !== 'string') {
      invalidField = fields[i];
    }

    i += 1;
  }

  if (invalidField) return next(boom.badData('Dados inválidos', invalidField));

  return next();
};

module.exports = fieldsValidator;
