const connection = require('../connection');

const updateData = async (collection, itemToUpdate, fields) => {
  console.log(itemToUpdate);
  const db = await connection();
  await db.collection(collection).updateOne(itemToUpdate,
    {
      $set: fields,
    });

  return db.collection(collection).find(itemToUpdate).toArray();
};

module.exports = {
  updateData,
};
