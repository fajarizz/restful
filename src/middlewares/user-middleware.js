const Joi = require('joi');

// Register validation
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(1).max(100).required(),
    addressId: Joi.number().integer().optional().allow(null)
});

// Login validation
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Update validation
const updateSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    password: Joi.string().min(6).optional(),
    name: Joi.string().min(1).max(100).optional(),
    addressId: Joi.number().integer().optional().allow(null)
});

function validate(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }
        next();
    };
}

module.exports = {
    validateRegister: validate(registerSchema),
    validateLogin: validate(loginSchema),
    validateUpdate: validate(updateSchema)
};

