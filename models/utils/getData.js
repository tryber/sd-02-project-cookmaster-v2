const connection = require('../connection');

const getAllData = (collection) => async () => {
  const db = await connection();
  return db.collection(collection).find().toArray();
};

const getDataFromField = async (collection, field) => {
  const db = await connection();
  return db.collection(collection).find(field).toArray();
};

module.exports = {
  getAllData,
  getDataFromField,
};
