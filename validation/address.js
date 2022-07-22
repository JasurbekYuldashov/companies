const Joi = require("joi");

const addressCreate = Joi.object({
    address: Joi.string().required(),
    company_id: Joi.number(),
})

module.exports = {
    addressCreate,
}