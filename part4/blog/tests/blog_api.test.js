const { test, after, beforeEach } = require('node:test')
const listWithManyBlogs = require('./list_of_blogs')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of listWithManyBlogs.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, listWithManyBlogs.blogs.length)
})

test('unique identifier property of the blog is id', async () => {
    const response = await api.get('/api/blogs')
    assert.notEqual(response.body[0].id, undefined)
})

test('http post request', async () => {
const newBlog = {
    title: "Test of new blog",
    author: "Nikolai Roshchin",
    url: "https://localhost.com/",
    likes: 70
}

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual( response.body.length, listWithManyBlogs.blogs.length + 1 )
    const content = response.body[response.body.length-1].author
    assert.strictEqual( content, 'Nikolai Roshchin' )
})

test('verifies that likes property will default to 0 is missing', async () => {
  const newBlog = {
    title: "Test of missing likes field",
    author: "Nikolai Roshchin",
    url: "https://localhost.com/",
}

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual( response.body.length, listWithManyBlogs.blogs.length + 1 )
    const content = response.body[response.body.length-1].likes
    assert.strictEqual( content, 0 )
})

after(async () => {
  await mongoose.connection.close()
})