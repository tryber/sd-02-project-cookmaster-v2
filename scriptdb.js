use cookmaster;

db.users.insertOne({ name: 'root', email: 'admin@admin.com', password: 'admin' });

db.recipes.insertMany(
  [
    {
      name: 'banana caramelizada',
      ingredients: 'banana, açúcar',
      preparation: 'coloque o açúcar na frigideira até virar caramelo e jogue a banana',
    },
    {
      name: 'maçã cozida',
      ingredients: 'maça, açúcar, cravo e canela',
      preparation: 'ponha a maçã para cozinhar com tudo',
    },
    {
      name: 'pipoca de microondas',
      ingredients: 'pacote de pipoca de microondas',
      preparation: 'siga as instruções do pacote',
    }
  ]
);
