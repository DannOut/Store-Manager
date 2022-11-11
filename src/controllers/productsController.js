const productsServices = require('../services/productsServices');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productsServices.findAll();

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(Number(id));
  console.log(message);
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
};