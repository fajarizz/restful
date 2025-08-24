const Joi = require('joi');

const contactSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(1).max(20).required(),
  userId: Joi.number().integer().optional().allow(null),
});

const updateSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).optional(),
  lastName: Joi.string().min(1).max(100).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(1).max(20).optional(),
  userId: Joi.number().integer().optional().allow(null),
});

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

module.exports = {
  validateCreate: validate(contactSchema),
  validateUpdate: validate(updateSchema)
};

