const salesServices = require('../services/salesServices');
const errorMap = require('../utils/errorMap');

const createSalesProducts = async (req, res) => {
  //* array
  const arrayBody = req.body;

  const { type, message } = await salesServices.createSalesProducts(arrayBody);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const findAll = async (_req, res) => {
  const { message } = await salesServices.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.findById(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(200).json(message);
};

const removeSales = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.removeSales(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  createSalesProducts,
  findAll,
  findById,
  removeSales,
};
