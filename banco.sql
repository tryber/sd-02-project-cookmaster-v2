use cookie_master;

db.users.insertMany([
    {
        "email":"teste1@gmail.com",
        "password": 123456,
        "name": "teste1",
        "role": "user"
    }
]);

CREATE TABLE Recipes (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_name VARCHAR(30) NOT NULL,
    ingredients VARCHAR(100) NOT NULL,
    how_to_prepare VARCHAR(350) NOT NULL,
    creator_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (creator_id) REFERENCES Users(id)
);

INSERT INTO Recipes (recipe_name, ingredients, how_to_prepare, creator_id)
VALUES
    ('Macarrão de Miojo', 'Miojo', 'Esquentar a água e colocar miojo', '1'),
    ('Pipoca de microondas', 'pipoca', 'Colocar no microondas', '1'),
    ('Batata frita', 'Batata', 'Fritar a batata', '2'),
    ('Salada', 'Alface e Tomate', 'Cortar o tomate e o alface', '2'),
    ('Pão de alho ao forno', 'Pão de alho', 'Comprar o pão de alho e colocar no forno', '2');
