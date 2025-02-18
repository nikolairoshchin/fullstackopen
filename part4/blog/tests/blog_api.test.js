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

after(async () => {
  await mongoose.connection.close()
})