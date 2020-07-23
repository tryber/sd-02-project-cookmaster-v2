const bcrypt = require('bcrypt');

require('dotenv').config();

const mongoClient = require('mongodb').MongoClient;

const DATABASE = process.env.DB_NAME;

async function connection() {
  try {
    const session = await mongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hash = await bcrypt.hash('admin', 10);

    await session.db(DATABASE).collection('users').insertOne({
      email: 'root@email.com',
      name: 'Taylor Swift',
      password: hash,
      role: 'admin',
    });

    console.log('Root user created!');

    session.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

connection();
