const db = require("../db");

class GenreController {
    async addGenre(req, res) {
        const {title} = req.body
        const newGenre = await db.query(`INSERT INTO genre (title) values ($1) RETURNING *`,
            [title])
        res.json(newGenre.rows[0])
    }
    async getGenres(req, res) {
        const genres = await db.query('SELECT * FROM genre')
        res.json(genres.rows)
    }
    async getSpecificGenre(req, res) {
        const id = req.params.id
        const genre = await db.query(`SELECT * FROM genre where id = $1`, [id])
        if (genre.rows.length !== 0) {
            res.json(genre.rows[0])
        } else {
            res.json({
                "errorCode": 404,
                "errorText": "Данного жанра не найдено"
            })
        }
    }
    async updateGenre(req, res) {
        const {id, title} = req.body
        const genre = await db.query(`UPDATE genre set title = $1 where id = $2 RETURNING *`,
            [title, id])
        if (genre.rows.length !== 0) {
            res.json(genre.rows[0])
        } else {
            res.json({
                "errorCode": 404,
                "errorText": "Данного жанра не найдено"
            })
        }
    }
    async deleteGenre(req, res) {
        const id = req.params.id
        const genre = await db.query(`SELECT * FROM genre where id = $1`, [id])
        if (genre.rows.length !== 0) {
            await db.query(`DELETE FROM genre where id = $1`, [id])
            res.json({
                "text": `Жанр ${id} успешно удалён`
            })
        } else {
            res.json({
                "errorCode": 404,
                "errorText": "Данного жанра не найдено"
            })
        }
    }
}

module.exports = new GenreController()
