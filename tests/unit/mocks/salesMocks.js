const newValidSale = {
  date: "2022-11-12 15:23:12",
};

const newCompletedSale = {
  id: 1,
  date: "2022-11-12 15:23:12",
};

const oneValidProduct = {
  id: 1,
  name: "Martelo de Thor",
};

const newSaleProduct = {
  saleId: 1,
  productId: oneValidProduct.id,
  quantity: 3,
};

const insertTwoAtOnce = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const insertFinalObject =
  {
    id: 1,
    itemsSold: insertTwoAtOnce
  }

module.exports = {
  newSaleProduct,
  newValidSale,
  insertTwoAtOnce,
  newCompletedSale,
  insertFinalObject,
};
