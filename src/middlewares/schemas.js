const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const nameProductSchema = Joi.object({ name: Joi.string().min(5).max(250).required() });

module.exports = {
  idSchema,
  nameProductSchema,
};