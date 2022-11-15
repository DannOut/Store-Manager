const productsModel = require('../models/productsModel');
const { validateId } = require('./validations/inputValuesValidations');

const NOT_FOUND = 'NOT_FOUND';
const PRODUCT_NOT_FOUND = 'Product not found';

const findAll = async () => {
  const allProducts = await productsModel.findAll();
  return { type: null, message: allProducts };
};

const findById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;
  const product = await productsModel.findById(id);

  if (product) return { type: null, message: product };
  return { type: NOT_FOUND, message: PRODUCT_NOT_FOUND };
};

const createProduct = async (name) => {
  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const update = async (id, nameToUpdate) => {
  const checkIfProductExists = await productsModel.findById(id);
  if (checkIfProductExists) {
    const newProductToUpdate = await productsModel.update(id, nameToUpdate);
    return { type: null, message: newProductToUpdate };
  }

  return { type: NOT_FOUND, message: PRODUCT_NOT_FOUND };
};

const removeProducts = async (id) => {
  const checkIfProductExists = await productsModel.findById(id);

  if (checkIfProductExists) {
    const affectedRows = await productsModel.removeProducts(id);
    return { type: null, message: affectedRows };
  }

  return { type: NOT_FOUND, message: PRODUCT_NOT_FOUND };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  update,
  removeProducts,
};
