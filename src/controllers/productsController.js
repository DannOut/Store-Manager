const productsServices = require('../services/productsServices');

const findAll = async (_req, res) => {
  const { message } = await productsServices.findAll();

  res.status(200).json(message);
};

module.exports = {
  findAll,
};