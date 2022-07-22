const Joi = require("joi");

const employeeCreate = Joi.object({
    name: Joi.string().required(),
    company_id: Joi.number().required(),
    status: Joi.string(),
})

module.exports = {
    employeeCreate,
}