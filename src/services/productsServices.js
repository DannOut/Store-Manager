const { productsModel } = require('../models');

const findAll = async () => {
  const allProducts = productsModel.findAll();
  return { type: null, message: allProducts };
};

module.exports = {
  findAll,
};