require('dotenv').config();

const User = require('./models/User');

(async () => {
  const newUser = new User('Alguém', 'root@email.com', 'admin', 'admin');

  const user = await newUser.add();

  console.log(user);
})();

process.abort();
