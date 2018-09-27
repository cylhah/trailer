const mongoose = require('mongoose')
const MovieModel = mongoose.model('Movie')

class MovieController {

  static async getMovies (ctx) {
    const movies = await MovieModel.find({}).sort({
      'meta.createdAt': -1
    })

    ctx.body = movies

    return movies
  }

  static async getOneMovie (ctx) {
    const movie = await MovieModel.findOne({doubanId: ctx.params.id})

    return movie
  }
}

module.exports = MovieController