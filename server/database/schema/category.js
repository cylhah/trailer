const mongooose = require('mongoose')
const Schema = mongooose.Schema

const categorySchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
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

categorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongooose.model('Category', categorySchema)