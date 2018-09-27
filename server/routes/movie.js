const router = require('koa-router')()
const movieCtrl = require('../controller/movieController')

router
      .get('/movies', movieCtrl.getMovies)
      .get('/movies/:id', movieCtrl.getOneMovie)

module.exports = router