const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

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

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(204).json({error: 'blog not found'})

    const user = request.user
  
    if ( blog.user.toString() === user.id.toString() ) {
        await blog.deleteOne()
        response.status(204).end()
    } else return response.status(401).json({error: 'you can not delete this blog'})
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