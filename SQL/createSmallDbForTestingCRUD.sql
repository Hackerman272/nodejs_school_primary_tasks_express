-- Создание БД для тестирования CRUD для ДЗ 2 по части nodeJS

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    title VARCHAR (24) NOT NULL
);

CREATE TABLE film (
    id SERIAL PRIMARY KEY,
    title_original VARCHAR (100) NOT NULL,
  	release_year INT NOT NULL
);

CREATE TABLE film_genre (
  film_id INT,
  genre_id INT,
  PRIMARY KEY (film_id, genre_id),
  CONSTRAINT fk_film FOREIGN KEY(film_id) REFERENCES film(id) ON DELETE CASCADE,
  CONSTRAINT fk_genre FOREIGN KEY(genre_id) REFERENCES genre(id) ON DELETE CASCADE
);
