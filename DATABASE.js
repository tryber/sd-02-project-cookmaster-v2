const { Db } = require("mongodb");

use cookmasterV2;

db.users.insertOne({
  "name": "admin",
  "email": "root@email.com",
  "password": "admin",
  "role": "admin",
});
