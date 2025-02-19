const mongoose = require('mongoose')
const config = require('../utils/config')
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

blogSchema.pre('save', async function(next) {
  if (this.likes === undefined) this.likes = 0
  next()
})

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
  })

  module.exports = mongoose.model('Blog', blogSchema)