const dbConnection = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

const connection = () =>
  dbConnection
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((mongo) => mongo.db('cookmaster'))
    .catch((err) => err);

const dbCookmaster = (coll) =>
  connection()
    .then((db) => db.collection(coll));

module.exports = dbCookmaster;
