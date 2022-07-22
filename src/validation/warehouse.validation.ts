import * as Joi from '@hapi/joi';

const warehouseCreate: Joi.Schema = Joi.object({
  description: Joi.string().min(3),
  title: Joi.string().required(),
  company_id: Joi.number().required(),
  status: Joi.string(),
});

export default warehouseCreate;
