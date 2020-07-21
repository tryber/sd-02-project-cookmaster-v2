const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create({ name, ingredients, preparation, authorId }) {
  return connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, url_image: null, author_id: authorId }),
  );
}

function getField({ key, value }) {
  if (key === 'id') {
    return ObjectId(value);
  }
  if (key === 'name-authorId') {
    return { name: value.name, author_id: ObjectId(value.authorId) };
  }
}

async function find({ key, value }) {
  return connection().then((db) => db.collection('recipes').findOne(getField({ key, value })));
}

async function list() {
  return connection().then((db) => db.collection('recipes').find().toArray());
}

async function remove(id) {
  return connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
}

async function update({ id, recipe: { name, ingredients, preparation } }) {
  return connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  );
}

async function upadateImage({ id, url }) {
  return connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { url_image: url } }),
  );
}

module.exports = {
  create,
  find,
  list,
  remove,
  update,
  upadateImage,
};
