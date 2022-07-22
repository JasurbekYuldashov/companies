const Joi = require("joi");

const companyCreate = Joi.object({
    name: Joi.string().required().min(3),
    type: Joi.string().required(),
    address: Joi.string().required(),
    status: Joi.string(),
})

module.exports = {
    companyCreate,
}