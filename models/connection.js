const mongoClient = require('mongodb').MongoClient;

const DATABASE = process.env.DB_NAME;

const URI = process.env.DB_URL;

async function connection() {
  return mongoClient
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((session) => session.db(DATABASE))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
