use cookmaster_v2;

db.users.insertMany([
  {
    name: 'Lyra',
    email: 'll@m.com',
    password: '1234567',
    role: 'user',
  },
  {
    name: 'admin',
    email: 'root@email.com',
    password: 'admin',
    role: 'admin',
  },
]);
