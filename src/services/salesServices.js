const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { validateId } = require('./validations/inputValuesValidations');
// const { validateId } = require('./validations/inputValuesValidations');

// TODO - NÂO FUNCIONA / VERIFICAR
const createSalesProducts = async (salesArray) => {
  const productsData = salesArray.map((sales) =>
    productsModel.findById(sales.productId));
  
  // RETURN DUAS PROMISES - console.log('PRODUCTS DATA', productsData);

  const resultProductsData = await Promise.all(productsData);
  // 1 UNDEFINED e UM OBJECT - console.log('RESULT PRODUCTS DATA', resultProductsData);
  
  const checkProducts = resultProductsData.every((value) => typeof value === 'object');
  
  if (checkProducts === false) return { type: 'NOT_FOUND', message: 'Product not found' };
  
  const salesId = await salesModel.insert();
  await Promise.all(
    salesArray.map(async (eachSale) => {
      const teste = { salesId, ...eachSale };
      salesModel.insertSalesProducts(teste);
    }),
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

  if (sales.length !== 0 || undefined) return { type: null, message: sales };
  return { type: 'NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  createSalesProducts,
  findAll,
  findById,
};
