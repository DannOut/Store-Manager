const productsServices = require('../services/productsServices');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productsServices.findAll();

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsServices.findById(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { message } = await productsServices.createProduct(name);

  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const { type, message } = await productsServices.update(Number(id), name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const removeProducts = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsServices.removeProducts(Number(id));
  // console.log('TYPE', type);
  // console.log('MESSAGE', message);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  findAll,
  findById,
  createProduct,
  update,
  removeProducts,
};