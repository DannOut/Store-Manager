const productsModel = require('../models/productsModel');
const { validateId } = require('./validations/inputValuesValidations');

const findAll = async () => {
  const allProducts = await productsModel.findAll();
  return { type: null, message: allProducts };
};

const findById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;
  const product = await productsModel.findById(id);

  if (product) return { type: null, message: product };
  return { type: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};