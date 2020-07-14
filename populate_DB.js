const ObjectId = () => { };
const db = 'Use DB';

db.users.insertMany([
  {
    _id: ObjectId('5f0cb22a6d3c8a379034fa4a'),
    name: 'pedro',
    email: 'pedro@gmail.com',
    password: '123456',
    role: 'user',
  },
  {
    _id: ObjectId('5f0cb22a6d3c8a379034fa4b'),
    name: 'joao',
    email: 'joao@gmail.com',
    password: '987654',
    role: 'user',
  },
  {
    _id: ObjectId('5f0cb22a6d3c8a379034fa4c'),
    name: 'roz',
    email: 'roz@gmail.com',
    password: 'roz123',
    role: 'admin',
  },
]);

db.recipes.insertMany([
  {
    _id: ObjectId('5f0cb22a6d3c8a379034fa4d'),
    name: 'Miojo',
    ingredients: 'Miojo e água',
    preparation: 'Ferver o miojo',
    image: 'uploads/5f0cb22a6d3c8a379034fa4d',
    author: ObjectId('5f0cb22a6d3c8a379034fa4a'),
  },
  {
    _id: ObjectId('5f0cb22a6d3c8a379034fa4e'),
    name: 'Pipoca de microondas',
    ingredients: 'Pipoca de microondas e um microondas',
    preparation: 'Colocar a pipoca para estourar no microondas',
    image: 'uploads/5f0cb22a6d3c8a379034fa4e',
    author: ObjectId('5f0cb22a6d3c8a379034fa4a'),
  },
  {
    _id: ObjectId('5f0cb22a6d3c8a379034fa4f'),
    name: 'Café',
    ingredients: 'Pó de café',
    preparation: 'Esquentar a água e coar o café',
    image: 'uploads/5f0cb22a6d3c8a379034fa4f',
    author: ObjectId('5f0cb22a6d3c8a379034fa4b'),
  },
]);
