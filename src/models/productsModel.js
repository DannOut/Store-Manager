const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return result;
};

const insert = async (body) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [body],
  );
  return insertId;
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { name, id };
};

const removeProducts = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
  return affectedRows;
};

const searchByName = async (query) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE CONCAT("%", ?, "%")',
    [query],
  );
  return result;
};
// SELECT * FROM StoreManager.products WHERE name LIKE '%eScudo%'
module.exports = {
  findAll,
  findById,
  insert,
  update,
  removeProducts,
  searchByName,
};