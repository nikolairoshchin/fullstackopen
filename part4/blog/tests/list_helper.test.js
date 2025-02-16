const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const listWithManyBlogs = require('./list_of_blogs')

const reverse = require('../utils/for_testing').totalLikes
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
    test('of empty list is zero', () => {
      const result = totalLikes([])
      assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
      const result = totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has many blogs', () => {
      const result = totalLikes(listWithManyBlogs.blogs)      
      assert.strictEqual(result, 36)
    })
})

describe('favorite blogs', () => {
  
  test('of empty list is {}', () => {
    const result = favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals the likes of that', () => {
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, expected)
  })

  test('when list has many blogs', () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    const result = favoriteBlog(listWithManyBlogs.blogs) 
    assert.deepStrictEqual(result, expected)
  })

})

describe('most blogs', () => {
  test('of empty list is 0', () => {
    const result = mostBlogs([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    const result = mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, expected)
  })

  test('when list has many blogs', () => {  
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = mostBlogs(listWithManyBlogs.blogs) 
    assert.deepStrictEqual(result, expected)
  })
})

describe('most likes', () => {
  test('of empty list is 0', () => {
    const result = mostLikes([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, expected)
  })

  test('when list has many blogs', () => {  
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    const result = mostLikes(listWithManyBlogs.blogs) 
    assert.deepStrictEqual(result, expected)
  })
})