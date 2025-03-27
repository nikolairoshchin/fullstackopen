const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const blogs = require('../tests/list_of_blogs')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/fill', async (request, response) => {
  const user = await User.find({})
  await blogs.blogs.map(e => e.user = user[0]._id.toString() )
  const result = await Blog.insertMany(blogs.blogs)

  response.json(result)
})

module.exports = router