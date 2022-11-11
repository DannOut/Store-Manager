const productsModel = require('../models/productsModel');

const findAll = async () => {
  const allProducts = await productsModel.findAll();
  return { type: undefined, message: allProducts };
};

module.exports = {
  findAll,
};