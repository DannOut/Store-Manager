const productsModel = require('../models/productsModel');

const findAll = async () => {
  const allProducts = await productsModel.findAll();
  return { type: null, message: allProducts };
};

module.exports = {
  findAll,
};