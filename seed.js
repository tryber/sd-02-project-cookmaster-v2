const db = 'use cookie_master';
db.users.insertMany([
    {
        "email":"teste1@gmail.com",
        "password": 123456,
        "name": "teste1",
        "role": "user"
    },
    {
        "name": "roz",
        "email": "root@email.com",
        "password": "admin",
        "role": "admin",
    },
]);
    