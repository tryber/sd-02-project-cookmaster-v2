use cookMaster;
db.users.insertOne(
  {
    "email":"root@email.com",
    "password": "admin",
    "name": "admin",
    "role": "admin",
  },
);
