import * as Joi from '@hapi/joi';

const employeeCreate: Joi.Schema = Joi.object({
  name: Joi.string().required(),
  company_id: Joi.number().required(),
  status: Joi.string(),
});

export default employeeCreate;
