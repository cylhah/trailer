const mongooose = require('mongoose')
const Schema = mongooose.Schema
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    unique: true,
    type: String
  },
  email: {
    unique: true,
    type: String
  },
  password: String,
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error)

      this.password = hash
      next()
    })
  })

  next()
})

userSchema.method = {
  comparePassword: (_password, passowrd) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, passowrd, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

mongooose.model('User', userSchema)