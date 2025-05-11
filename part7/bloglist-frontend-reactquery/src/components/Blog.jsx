import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import BlogContext from '../context/BlogContext'
import UserContext from '../context/UserContext'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
 
  const { id } = useParams()
  const [blogs, blogsDispatch] = useContext(BlogContext)
  const [user, userDispatch] = useContext(UserContext)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const blog = blogs.find(item => item.id === id)

  if (!blog) {
    return <p>Blog not found...</p>
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const currentUser = blog.user
    const newBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes
    }
    try {
      const response = await blogService.update(newBlog, blog.id)
      response.user = currentUser
      blogsDispatch({ 
        type: 'setBlogs', 
        payload: (blogs.map(item => item.id === blog.id ? response : item)) 
      })
    } catch (exeption) {}
  }

  const handleDelete = async (event, blog) => {
    event.preventDefault()
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        const response = await blogService.remove(blog.id)
        blogsDispatch({ 
          type: 'setBlogs', 
          payload: (blogs.filter(item => item.id !== blog.id))
        })
        navigate('/')
      } catch (exeption) { console.error(exception) }
      
    }
  }

  const clearCommentForm = () => {
    setComment('')
  }

  const handleCreateNewComment = async (event, comment) => {
    event.preventDefault()
    const currentUser = blog.user
    const comments = blog.comments.concat(comment)
    const newBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: comments
    }
    try {
      const response = await blogService.update(newBlog, blog.id)
      response.user = currentUser
      blogsDispatch({ 
        type: 'setBlogs', 
        payload: (blogs.map(item => item.id === blog.id ? response : item)) 
      })
      clearCommentForm()
    } catch (exeption) { console.error(exception) }
  }


  return (
    <div>
      <h1> {blog.title} {blog.author} </h1>
      <div>
        <a href={`http://${blog.url}`}> {blog.url} </a> <br />
        <span>{`${blog.likes} likes `}</span>
        <button onClick={(event) => handleLike(event, blog)} >like</button> <br />
        added by { (blog.user ) ? blog.user.name : ''} <br />
        { user && (blog.user.id === user.userId) && <button onClick={(event) => handleDelete(event, blog)} >delete</button>}
      </div>
      <h2>comments</h2>
 
      <form onSubmit={(event) => handleCreateNewComment(event, comment)}>
      <input
            type = "text"
            value = {comment}
            name = "Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
      </form>


      <ul>
        {(blog.comments).map((comment, index) => 
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )}

export default Blog