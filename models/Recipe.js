const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');
const connection = require('./connection');

class Recipe {
  constructor(name = '', ingredients = '', preparation = '', user_id, url = '') {
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.user_id = user_id;
    this.url = url;
  }

  static async getAll() {
    return connection().then((db) => db.collection('recipes').find().toArray())
  }

  static async getById(id) {
    return connection().then((db) =>
      db.collection('recipes').findOne(ObjectId(id)),
    );
  }

  static async getByUserId(userId) {
    return connection().then((db) =>
      db.collection('recipes').findOne({ userId }),
    );
  }

  static async deleteById(id) {
    return connection().then((db) =>
      db.collection('recipes').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );
  }

  async add() {
    return connection().then((db) =>
      db.collection('recipes').insertOne(this),
    );
  }

  async updateById(id) {
    return connection().then((db) => db.collection('recipes')
      .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this })
    );
  }
}

module.exports = Recipe;

