import * as Joi from '@hapi/joi';

const addressCreate: Joi.Schema = Joi.object({
  address: Joi.string().required(),
  company_id: Joi.number(),
});

export default addressCreate;
