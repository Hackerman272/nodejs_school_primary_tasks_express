const Router = require('express')
const router = new Router()
const filmController = require('../controller/film.controller')

router.post('/film', filmController.addFilm)
router.get('/allfilms', filmController.getFilms)
router.get('/film/:id', filmController.getSpecificFilm)
router.put('/film', filmController.updateFilm)
router.delete('/film/:id', filmController.deleteFilm)

module.exports = router
