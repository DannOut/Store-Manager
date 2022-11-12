const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return insertId;
};

const insertSalesProducts = async ({ salesId, productId, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [salesId, productId, quantity],
  );
  return insertId;
};

module.exports = {
  insert,
  insertSalesProducts,
};