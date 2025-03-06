const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if ((!body.title) || (!body.url)) {
        return response.status(400).json({ error: 'content missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
  
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
    }

    const result = await Blog.findByIdAndUpdate(
        request.params.id, 
        updateBlog,
        {new: true})
    response.json(result)
})

module.exports = blogRouter