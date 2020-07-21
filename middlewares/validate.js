const Boom = require('@hapi/boom');

function validate(schema) {
  return async (req, _res, next) => {
    try {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        throw Boom.badRequest('Dados inválidos', {
          details: error.details.map(({ message }) => message),
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = validate;
