const boom = require('boom');

const fieldsValidator = (fields) => async (req, _res, next) => {
  const data = fields.map((field) => req.body[field]);

  //const invalidFields = [];

//   for (let i = 0; i < fields.length; i += 1) {
//     if (typeof data[i] !== 'string') {
//       invalidFields.push(fields[i]);
//     }
//   }

  const invalidFields = fields.filter((_field, i) => typeof data[i] !== 'string');

//   while (!invalidField && i < fields.length) {
//     if (typeof data[i] !== 'string') {
//       invalidField = fields[i];
//     }

//     i += 1;
//   }

  return invalidFields.length > 0
    ? next(boom.badData('Dados inválidos', invalidFields.join(', ')))
    : next();
};

module.exports = fieldsValidator;
