const invalidProductId = [
  {
    productId: -10,
    quantity: 1,
  },
];

const noProductIdBody = [
  {
    quantity: 1,
  },
];

const invalidQuantity = [
  {
    productId: 1,
    quantity: -10,
  },
];

const noQuantityBody = [
  {
    productId: 1,
  },
];

module.exports = {
  invalidProductId,
  noProductIdBody,
  invalidQuantity,
  noQuantityBody,
};
