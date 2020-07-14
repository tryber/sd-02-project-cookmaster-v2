require('dotenv').config()

const User = require('./models/User');

(func = async () => {
  const newUser = new User('Alguém', 'email_de_alguem@gmail.com', 'password', 'admin');
  
  const user = await newUser.add();
  
  console.log(user);
})();

process.abort();
