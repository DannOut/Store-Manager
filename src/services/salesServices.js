const salesModel = require('../models/salesModel');

const createSalesProducts = async (salesArray) => {
  const saleId = await salesModel.insert();

  await Promise.all(
    salesArray.map(async (eachSale) => salesModel
        .insertSalesProducts({ saleId, ...eachSale })),
  );
  return { type: null, message: { id: saleId, itemsSold: salesArray } };
};

module.exports = {
  createSalesProducts,
};
