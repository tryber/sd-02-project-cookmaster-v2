use cook_master_v2;
db.users.insertOne(
  {
    "email":"root@email.com",
    "password": "admin",
    "name": "admin",
    "role": "admin",
  },
);
