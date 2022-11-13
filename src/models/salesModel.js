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

const findAll = async () => {
  const [result] = await connection.execute(
  `SELECT SP.sale_id AS saleId, SP.product_id AS productId, SP.quantity, SA.date
  FROM StoreManager.sales_products AS SP
  INNER JOIN StoreManager.sales AS SA
  ON SA.id = SP.sale_id
  ORDER BY SP.sale_id, SP.product_id;`,
  );
  return result;
};

const findById = async (salesId) => {
  const [result] = await connection.execute(
    `SELECT SP.product_id AS productId, SP.quantity, SA.date
  FROM StoreManager.sales_products AS SP
  INNER JOIN StoreManager.sales AS SA
  ON SA.id = SP.sale_id
  WHERE SA.id = ?
  ORDER BY SP.sale_id, SP.product_id;`,
    [salesId],
  );
  return result;
};

module.exports = {
  insert,
  insertSalesProducts,
  findAll,
  findById,
};