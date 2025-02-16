
const dummy = (blogs) => {
  return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((acc, item) => acc + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  
  if (blogs.length === 0) return {}  
  let favorite = blogs[0]
  
  blogs.map(item => {
    if (item.likes > favorite.likes) favorite = item
  })
  let result = { title: favorite.title, 
                  author: favorite.author, 
                  likes: favorite.likes 
                }
  return result
}

const mostBlogs = (blogs) => {
  const arr = []
  let existingIndex = 0
  let maxBlogs = 0
  let result = {}
  blogs.map(item => {
    newItem = {
      author: item.author,
      blogs: 1
    }
  existingIndex = arr.findIndex(el => el.author === item.author)
 
  if ( existingIndex === -1) 
    {arr.push(newItem)}
  else 
    {arr[existingIndex].blogs += 1}
  })

  arr.map(el => {
    if (el.blogs > maxBlogs) {
      maxBlogs = el.blogs
      result = el
    }
  })
  
  return result
}

const mostLikes = (blogs) => {
  const arr = []
  let existingIndex = 0
  let maxLikes = 0
  let result = {}
  blogs.map(item => {
    newItem = {
      author: item.author,
      likes: item.likes
    }

  existingIndex = arr.findIndex(el => el.author === item.author)
 
  if ( existingIndex === -1) 
    {arr.push(newItem)}
  else 
    {arr[existingIndex].likes += item.likes}
  })

  arr.map(el => {
    if (el.likes > maxLikes) {
      maxLikes = el.likes
      result = el
    }
  })
  
  return result
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }