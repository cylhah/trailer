const mongooose = require('mongoose')
const Schema = mongooose.Schema
const Mixed = Schema.Types.Mixed

const movieSchema = new Schema({
  doubanId: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  rate: Number,
  title: String,
  summary: String,
  video: String,
  poster: String,
  cover: String,
  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,
  tags: [String],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongooose.model('Movie', movieSchema)