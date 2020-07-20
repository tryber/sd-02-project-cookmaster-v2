use cookie_master;
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
db.recipes.insertMany(
    [
      {
        name: 'Cachaça brava',
        ingredients: 'cachaça, raiva',
        preparation: 'vire uma garrafa de 51 e mantenha a fé',
      },
      {
        name: 'drogas pesadas',
        ingredients: 'drogas, peso',
        preparation: 'pegue as drogas e use',
      },
      {
        name: 'corote de satanas',
        ingredients: 'todas as cores de corote',
        preparation: 'misture todos os corotes e vá parar no hospital',
      }
    ]
  );