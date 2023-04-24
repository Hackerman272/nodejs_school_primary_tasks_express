const Router = require('express')
const router = new Router()
const genreController = require('../controller/genre.controller')

router.post('/genre', genreController.addGenre)
router.get('/allgenres', genreController.getGenres)
router.get('/genre/:id', genreController.getSpecificGenre)
router.put('/genre', genreController.updateGenre)
router.delete('/genre/:id', genreController.deleteGenre)

module.exports = router
