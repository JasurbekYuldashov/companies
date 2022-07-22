import * as Joi from '@hapi/joi';

const companyCreate: Joi.Schema = Joi.object({
  name: Joi.string().required().min(3),
  type: Joi.string().required(),
  address: Joi.string().required(),
  status: Joi.string(),
});

export default companyCreate;
