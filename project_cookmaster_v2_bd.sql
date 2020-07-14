CREATE DATABASE IF NOT EXISTS project_cookmaster_v2;

USE project_cookmaster_v2;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(3) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY `email_un` (email)
);

CREATE TABLE recipes (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    ingredients VARCHAR(200) NOT NULL,
    prepare_method VARCHAR(500) NOT NULL,
    url_image VARCHAR(500),
    author_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

INSERT INTO users (id, email, password, name, role) VALUES 
    ('1', 'johnatas@trybe.com.br', '1', 'Johnatas Henrique', 'adm'),
	('2', 'rogeriomunhoz@betrybe.com.br', 'senhaGrande', 'Rogerio Munhoz', 'adm');

INSERT INTO recipes(id, name, ingredients, prepare_method, author_id) VALUES
('1', 'Miojo', 'Pacote de miojo e água', 'Esquenta a água, joga o miojo dentro e espera 3 min, depois coloca o sachê', '1'),
('2', 'Batata-frita', 'Batatas e óleo', 'Descasque e corte as batatas em formato de palitos, esquente o óleo até ferver e depois jogue as batatas cortadas dentro.', '2'),
('3', 'Batata assada', 'Batatas e sal', 'Asse as batatas fatiadas.', '2'),
('4', 'Batata cozida', 'Batatas e água', 'Cozinhe as batatas.', '1'),
('5', 'Purê de Batata', 'Batatas e não sei', 'Amasse as batatas.', '1');
