const { test, after, beforeEach } = require('node:test')
const listWithManyBlogs = require('./list_of_blogs')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')

const api = supertest(app)
let token = ''

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash, id: '' })

  await user.save()

  const response = await api
    .post('/api/login')
    .send({username: "root", password: "sekret"})
    .expect(200)
  token = response.body.token

  await Blog.deleteMany({})

    for (let blog of listWithManyBlogs.blogs) {
        blog.user = user.id
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual( response.body.length, listWithManyBlogs.blogs.length + 1 )
    const content = response.body[response.body.length-1].likes
    assert.strictEqual( content, 0 )
})

test('verify that the title and url properties are present', async () => {
  const newBlog = {
    title: "",
    author: "Nikolai Roshchin",
    url: "",
    likes: 1
  }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual( response.body.length, listWithManyBlogs.blogs.length )
})

test('single post deleting', async () => {
  const id = '5a422a851b54a676234d17f7'
  await api
  .delete(`/api/blogs/${id}`)
  .set('Authorization', `Bearer ${token}`)
  .expect(204)

  const response = await api.get('/api/blogs')
  assert.strictEqual( response.body.length, listWithManyBlogs.blogs.length - 1 )
})

test('update blog post', async () => {
  const id = '5a422a851b54a676234d17f7'
  const updateBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 9
  }

  await api
  .put(`/api/blogs/${id}`)
  .send(updateBlog)
  .set('Authorization', `Bearer ${token}`)
  .expect(200)

  const response = await api.get(`/api/blogs/${id}`)
  assert.strictEqual( response.body.likes, 9 )
})

test('adding blog post if token is not provivded', async () => {
  const newBlog = {
    title: "Test of new blog",
    author: "Nikolai Roshchin",
    url: "https://localhost.com/",
    likes: 70
}

    await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', ``)
    .expect(401)
    .expect('Content-Type', /application\/json/)
}) 

after(async () => {
  await mongoose.connection.close()
})