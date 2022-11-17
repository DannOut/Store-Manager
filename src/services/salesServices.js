const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { validateId } = require('./validations/inputValuesValidations');

const NOT_FOUND = 'NOT_FOUND';
const SALES_NOT_FOUND = 'Sale not found';

// TODO - NÂO FUNCIONA / VERIFICAR
const createSalesProducts = async (salesArray) => {
  // array que veio do body
  // verifica se o produto existe dentro do array
  const productsData = salesArray.map((sales) =>
    productsModel.findById(sales.productId));

  const resultProductsData = await Promise.all(productsData);
  const checkProducts = resultProductsData.every(
    (value) => typeof value === 'object',
  );

  if (checkProducts === false) { return { type: NOT_FOUND, message: 'Product not found' }; }

  const salesId = await salesModel.insert();
  await Promise.all(
    salesArray.map((eachSale) =>
      salesModel.insertSalesProducts({ salesId, ...eachSale })),
  );

  return { type: null, message: { id: salesId, itemsSold: salesArray } };
};

//*  OUTROS SERVICES
const findAll = async () => {
  const allSales = await salesModel.findAll();
  return { type: null, message: allSales };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;
  const sales = await salesModel.findById(id);

  if (sales.length !== 0) return { type: null, message: sales };
  return { type: NOT_FOUND, message: SALES_NOT_FOUND };
};

const removeSales = async (id) => {
  const checkIfSaleExists = await salesModel.findById(id);
  if (checkIfSaleExists.length !== 0) {
    const affectedRows = await salesModel.removeSales(id);
    return { type: null, message: affectedRows };
  }

  return { type: NOT_FOUND, message: SALES_NOT_FOUND };
};

const update = async (id, arrayToUpdate) => {
  const checkSalesId = await salesModel.findSale(id);

  if (!checkSalesId) return { type: NOT_FOUND, message: SALES_NOT_FOUND };

  const productsData = arrayToUpdate.map((products) =>
    productsModel.findById(products.productId));
  const resultProductsData = await Promise.all(productsData);

  const checkProducts = resultProductsData.every(
    (value) => typeof value === 'object',
  );

  if (checkProducts === false) { return { type: NOT_FOUND, message: 'Product not found' }; }

  await Promise.all(
    arrayToUpdate.map((eachSale) =>
      salesModel.update({ ...checkSalesId, ...eachSale })),
  );
  return { type: null, message: { saleId: id, itemsUpdated: arrayToUpdate } };
};

module.exports = {
  createSalesProducts,
  findAll,
  findById,
  removeSales,
  update,
};
