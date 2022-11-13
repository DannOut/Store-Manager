const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const salesProductSchema = Joi.object({
  productId: idSchema,
  quantity: idSchema,
});

module.exports = {
  idSchema,
  salesProductSchema,
  nameProductSchema,
};
