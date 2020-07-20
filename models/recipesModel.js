const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create({ name, ingredients, preparation, authorId }) {
  return connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, url_image: null, author_id: authorId }),
  );
}

async function find(id) {
  return onnection().then((db) => db.collection('recipes'));
}

async function list() {
  return onnection().then((db) => db.collection('recipes'));
}

async function remove(id) {
  return onnection().then((db) => db.collection('recipes'));
}

async function update(id) {
  return onnection().then((db) => db.collection('recipes'));
}

async function upadateImage(id) {
  return onnection().then((db) => db.collection('recipes'));
}

module.exports = {
  create,
  find,
  list,
  remove,
  update,
  upadateImage,
};
