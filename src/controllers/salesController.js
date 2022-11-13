const salesServices = require('../services/salesServices');

const createSalesProducts = async (req, res) => {
  //* array
  const arrayBody = req.body;

  const { message } = await salesServices.createSalesProducts(arrayBody);

  return res.status(201).json(message);
};

module.exports = {
  createSalesProducts,
};