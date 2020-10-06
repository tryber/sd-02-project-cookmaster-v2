const getSchema = require('./getSchema');
const { ObjectId } = require('mongodb');

const updateRecipe = async (id, name, ingredients, preparation) => (
  getSchema().then((db) => db.collection('recipes').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set: {
        name,
        ingredients,
        preparation,
      },
    }))
);


module.exports = updateRecipe;
