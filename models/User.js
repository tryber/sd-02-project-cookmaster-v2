const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');
const connection = require('./connection');

class User {
  constructor(name = '', email = '', password = '', role = 'user') {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async add() {
    return connection().then((db) =>
      db.collection('users').insertOne(this),
    );
  }

  static async getById(id) {
    return connection().then((db) =>
      db.collection('users').findOne(ObjectId(id)),
    );
  }

  static async getByEmail(email) {
    console.log(email)
    return connection().then((db) =>
      db.collection('users').findOne({ email }),
    );
  }

  async updateById(id) {
    return connection().then((db) =>
      db.collection('users').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this }),
    );
  }
}

module.exports = User;
