const db = require("../db")

class FilmController {
    async addFilm(req, res) {
        const {title_original, release_year, genresIds} = req.body
        if (genresIds !== undefined) {
            for (const genreId of genresIds) {
                const genre = await db.query(`SELECT * FROM genre where id = $1`, [genreId])
                if (genre.rows.length === 0) {
                    res.json({
                        "errorCode": 404,
                        "errorText": `Указанный id жанра не существует: ${genreId}`
                    })
                    return 404
                }
            }
        }

        const newFilm = await db.query(`INSERT INTO film (title_original, release_year) values ($1, $2) RETURNING *`,
            [title_original, release_year])
        newFilm.rows[0]["genresIds"] = []
        if (genresIds !== undefined) {
            for (const genreId of genresIds) {
                await db.query(`INSERT INTO film_genre (film_id, genre_id) values ($1, $2) RETURNING *`,
                    [newFilm.rows[0]["id"], genreId])
                newFilm.rows[0]["genresIds"].push(genreId)
            }
        }
        res.json(newFilm.rows[0])
    }
    async getFilms(req, res) {
        const films = await db.query('SELECT film.id, film.title_original, film.release_year, array_remove(array_agg(film_genre.genre_id), NULL) AS genresIds\n' +
            '    FROM film LEFT JOIN film_genre ON film.id = film_genre.film_id GROUP  BY 1')
        res.json(films.rows)
    }
    async getSpecificFilm(req, res) {
        const id = req.params.id
        const film = await db.query(`SELECT film.id, film.title_original, film.release_year, array_remove(array_agg(film_genre.genre_id), NULL) AS genresIds
    FROM film LEFT JOIN film_genre ON film.id = film_genre.film_id WHERE film.id = $1 GROUP  BY 1;`, [id])
        if (film.rows.length !== 0) {
            res.json(film.rows[0])
        } else {
            res.json({
                "errorCode": 404,
                "errorText": "Данного фильма не найдено"
            })
        }
    }
    async updateFilm(req, res) {
        const {id, title_original, release_year, genresIds} = req.body
        if (genresIds !== undefined) {
            for (const genreId of genresIds) {
                const genre = await db.query(`SELECT * FROM genre where id = $1`, [genreId])
                if (genre.rows.length === 0) {
                    res.json({
                        "errorCode": 404,
                        "errorText": `Указанный id жанра не существует: ${genreId}`
                    })
                    return 404
                }
            }
        }

        const film = await db.query(`UPDATE film set title_original = $1, release_year = $2 where id = $3 RETURNING *`,
            [title_original, release_year, id])
        if (film.rows.length !== 0) {
            if (genresIds !== undefined){
                await db.query(`DELETE FROM film_genre where film_id = $1`, [id])

                film.rows[0]["genresIds"] = []
                for (const genreId of genresIds) {
                    await db.query(`INSERT INTO film_genre (film_id, genre_id) values ($1, $2) RETURNING *`,
                        [film.rows[0]["id"], genreId])
                    film.rows[0]["genresIds"].push(genreId)
                }
            }

            res.json(film.rows[0])
        } else {
            res.json({
                "errorCode": 404,
                "errorText": "Данного фильма не найдено"
            })
        }
    }
    async deleteFilm(req, res) {
        const id = req.params.id
        const film = await db.query(`SELECT * FROM film where id = $1`, [id])
        if (film.rows.length !== 0) {
            await db.query(`DELETE FROM film where id = $1`, [id])
            res.json({
                "text": `Фильм ${id} успешно удалён`
            })
        } else {
            res.json({
                "errorCode": 404,
                "errorText": "Данного фильма не найдено"
            })
        }
    }
}

module.exports = new FilmController()
