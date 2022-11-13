// const productsModel = require('../../models/productsModel');

// const validateSales = async (sales) => {
//   const products = await productsModel.findAll();
//   const salesChecker = sales.every((sale) => products
//     .some((product) => product.id === sale.productId));
//   if (!salesChecker) {
//     return { type: 'INVALID_VALUE', message: 'Product not found' };
//   }
//   return { type: null, message: '' };
// };

// module.exports = {
//   validateSales,
// };