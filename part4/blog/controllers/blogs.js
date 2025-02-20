const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    if ((!body.title) || (!body.url)) {
        return response.status(400).json({ error: 'content missing' })
    }

    const blog = new Blog(body)
  
    const result = await blog.save()
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