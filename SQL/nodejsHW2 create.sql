-- Я старался придерживаться скоупа задания и не копировать совсем всю структуру кинопоиска. В противном случае понадобилось ещё бы несколько таблиц под награды, бокс-офис, рейтинги, лого, трейлеры, рецензии, и так далее...

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    title VARCHAR (100) NOT NULL,
    url VARCHAR (2048) NOT NULL
);

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    title VARCHAR (24) NOT NULL
);


CREATE TABLE country (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    short_name VARCHAR (12) NOT NULL
);

CREATE TABLE audience (
    id SERIAL PRIMARY KEY,
    audience_total INT NOT NULL,
  	release_date DATE NOT NULL
);

CREATE TABLE audience_country (
  audience_id INT,
  country_id INT,
  PRIMARY KEY (audience_id, country_id),
  CONSTRAINT fk_audience FOREIGN KEY(audience_id) REFERENCES audience(id) ON DELETE CASCADE,
  CONSTRAINT fk_country FOREIGN KEY(country_id) REFERENCES country(id) ON DELETE CASCADE
);

CREATE TYPE role_choice AS ENUM ('actor', 'dubbing_actor', 'director', 'scenario', 'producer', 'operator', 'composer', 'artist', 'editor');
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title role_choice NOT NULL
);

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
	height INT,
	birth_date DATE,
	birth_place VARCHAR (100),
	total_films INT,
	spouse_id INT,
	CONSTRAINT fk_person FOREIGN KEY(spouse_id) REFERENCES person(id)
);

CREATE TABLE person_role (
  person_id INT,
  role_id INT,
  PRIMARY KEY (person_id, role_id),
  CONSTRAINT fk_person FOREIGN KEY(person_id) REFERENCES person(id) ON DELETE CASCADE,
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE
);



CREATE TYPE minimum_age_choice AS ENUM ('0+', '3+', '6+', '12+', '14+', '16+', '18+');
CREATE TYPE age_rating_mpaa_choice AS ENUM ('G', 'PG', 'PG-13', 'R', 'NC-17');
CREATE TABLE film (
    id SERIAL PRIMARY KEY,
    title_original VARCHAR (100) NOT NULL,
  	title_local VARCHAR (100) NOT NULL,
  	release_year INT NOT NULL,
    country VARCHAR (100) NOT NULL,
    genre_id INT NOT NULL,
	tagline VARCHAR(1000) NOT NULL,
	director_id INT NOT NULL,
	scenario_id INT NOT NULL,
	producer_id INT NOT NULL,
	operator_id INT NOT NULL,
	composer_id INT NOT NULL,
	artist_id INT NOT NULL,
	editor_id INT NOT NULL,
	budget INT,
	marketing_budget INT,
	fees_us INT,
	fees_world_delta INT,
	fees_world INT,
  	audience_id INT,
  	release_date_russia DATE NOT NULL,
  	release_russia_company_id INT,
  	release_date_world DATE NOT NULL,
  	re_release_date_russia DATE,
  	re_release_russia_company_id INT,
  	release_dvd_info VARCHAR(30),
  	release_blue_ray_info VARCHAR(30),
  	minimum_age minimum_age_choice NOT NULL,
  	age_rating_mpaa age_rating_mpaa_choice,
  	duration VARCHAR(20) NOT NULL,
	score_marks INT,
	score DECIMAL,
	score_imdb DECIMAL,
	score_imdb_marks INT,
    active BOOLEAN NOT NULL,
  	CONSTRAINT fk_genre
		FOREIGN KEY(genre_id)
		   REFERENCES genre(id),
 	CONSTRAINT fk_audience
		FOREIGN KEY(audience_id)
		   REFERENCES audience(id),
		FOREIGN KEY(release_russia_company_id)
		   REFERENCES company(id),
		FOREIGN KEY(re_release_russia_company_id)
		   REFERENCES company(id),
		FOREIGN KEY(director_id)
		   REFERENCES person(id),
		FOREIGN KEY(scenario_id)
		   REFERENCES person(id),
		FOREIGN KEY(producer_id)
		   REFERENCES person(id),
		FOREIGN KEY(operator_id)
		   REFERENCES person(id),
		FOREIGN KEY(composer_id)
		   REFERENCES person(id),
		FOREIGN KEY(artist_id)
		   REFERENCES person(id),
		FOREIGN KEY(editor_id)
		   REFERENCES person(id)
);

CREATE TABLE film_actor (
  film_id INT,
  actor_id INT,
  PRIMARY KEY (film_id, actor_id),
  CONSTRAINT fk_film FOREIGN KEY(film_id) REFERENCES film(id) ON DELETE CASCADE,
  CONSTRAINT fk_person FOREIGN KEY(actor_id) REFERENCES person(id) ON DELETE CASCADE
);


CREATE TABLE film_dubbing_actor (
  film_id INT,
  dubbing_actor_id INT,
  PRIMARY KEY (film_id, dubbing_actor_id),
  CONSTRAINT fk_film FOREIGN KEY(film_id) REFERENCES film(id) ON DELETE CASCADE,
  CONSTRAINT fk_person FOREIGN KEY(dubbing_actor_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE film_country (
  film_id INT,
  country_id INT,
  PRIMARY KEY (film_id, country_id),
  CONSTRAINT fk_film FOREIGN KEY(film_id) REFERENCES film(id) ON DELETE CASCADE,
  CONSTRAINT fk_country FOREIGN KEY(country_id) REFERENCES country(id) ON DELETE CASCADE
);
