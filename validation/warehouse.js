const Joi = require("joi");

const warehouseCreate = Joi.object({
    description: Joi.string().min(3),
    title: Joi.string().required(),
    company_id: Joi.number().required(),
    status: Joi.string(),
})

module.exports = {
    warehouseCreate,
}