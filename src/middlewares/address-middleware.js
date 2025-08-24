const Joi = require('joi');

const addressSchema = Joi.object({
  street: Joi.string().min(1).max(255).required(),
  city: Joi.string().min(1).max(100).required(),
  province: Joi.string().min(1).max(100).required(),
  postalCode: Joi.string().min(1).max(20).required(),
});

const updateSchema = Joi.object({
  street: Joi.string().min(1).max(255).optional(),
  city: Joi.string().min(1).max(100).optional(),
  province: Joi.string().min(1).max(100).optional(),
  postalCode: Joi.string().min(1).max(20).optional(),
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
  validateCreate: validate(addressSchema),
  validateUpdate: validate(updateSchema)
};

