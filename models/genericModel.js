const dbCookmaster = require('./dbConnection');

const insert = (coll, data) =>
  dbCookmaster(coll)
    .then((collection) =>
      collection.insertOne(data))
    .catch((err) => err);

const getLastData = (coll) =>
  dbCookmaster(coll)
    .then((collection) =>
      collection
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray());

const getBy = (coll, key, value) =>
  dbCookmaster(coll)
    .then((collection) =>
      collection
        .find({ [key]: value })
        .toArray());

const getById = (coll, value) =>
  dbCookmaster(coll)
    .then((collection) =>
      collection
        .find({ _id: value })
        .toArray());


const getAllRecipes = () =>
  dbCookmaster('recipes')
    .then((collection) =>
      collection
        .find()
        .toArray());

module.exports = {
  getAllRecipes,
  getLastData,
  getById,
  insert,
  getBy,
};
