use cookmaster;

db.createCollection('users');

db.createCollection('recipes');

db.users.insertMany([
  { "_id": 1, "name": "tryber", "password": "admin", "email": "root@email.com", "role": "admin" },
  { "_id": 2, "name": "richard", "password": "123456", "email": "rw@rw.com", "role": "user" },
  { "_id": 3, "name": "cozinheiro", "password": "cozinha", "email": "cozi@nheiro.com", "role": "admin" },
  { "_id": 4, "name": "reginaldo", "password": "garçom", "email": "reginaldo@rossi.com", "role": "user" }
]);

db.users.createIndex({ email: 1 }, { unique: true });

db.recipes.insertMany([
  {
    "_id": 1,
    "name": "Mandioca",
    "ingredients": "Mandioca",
    "preparation": "Coloca na panela, espera e come depois de 1h",
    "userId": 2
  },
  {
    "_id": 2,
    "name": "Banana Verde Frita",
    "ingredients": "Banana, óleo",
    "preparation": "Corta a banana, joga no oleo quente, tira e come",
    "userId": 4
  },
  {
    "_id": 3,
    "name": "Crepe Caseiro",
    "ingredients": "Ovo, Leite, Maizena",
    "preparation": "Mistura tudo, pôe na frigideira e faz um molho do seu jeito",
    "userId": 3
  },
  {
    "_id": 4,
    "name": "Arroz",
    "ingredients": "Arroz",
    "preparation": "Arroz na panela, mexa 5 minutos. Jogue a primeira agua, espere secar e jogue a segunda agua. Quando secar, tá pronto.,",
    "userId": 3
  },
  {
    "_id": 5,
    "name": "Salada de Frutas",
    "ingredients": "Todas as frutas que você quiser, leite condensado",
    "preparation": "Corte as frutas e jogue leite condensado. Pronto.",
    "userId": 1
  },
  {
    "_id": 6,
    "name": "Água",
    "ingredients": "Hidrogênio, oxigênio",
    "preparation": "Misture duas moléculas de hidrogênio e uma de oxigênio. Pronto",
    "userId": 1
  },
  {
    "_id": 7,
    "name": "Café",
    "ingredients": "Café 3 Corações, Água, açúcar mascavo",
    "preparation": "Ferver a agua com açú, passe a agua no pó e é isso ai.",
    "userId": 2
  },
]);
