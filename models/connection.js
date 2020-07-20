const mongoClient = require('mongodb').MongoClient;

DATABASE = process.env.DB_NAME;

const connection = () => {
  return mongoClient
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((session) => session.db(DATABASE))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
