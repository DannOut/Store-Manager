const camelize = require('camelize');
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

const findSale = async (saleId) => {
  const [[result]] = await connection.execute(
    'SELECT sale_id FROM StoreManager.sales_products WHERE sale_id = ?', [saleId],
  );
  return camelize(result);
};

const removeSalesProducts = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
};

const removeSales = async (id) => {
  await removeSalesProducts(id);

  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const update = async ({ saleId, productId, quantity }) => {
  const [{ changedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId],
  );
  return changedRows;
};

module.exports = {
  insert,
  insertSalesProducts,
  findAll,
  findById,
  removeSales,
  update,
  findSale,
};
