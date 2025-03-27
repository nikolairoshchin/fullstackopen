import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='togglableContent'>
        {blog.url} <br />
        <span>{`likes: ${blog.likes}`}</span>
        <button onClick={handleLike} >like</button> <br />
        { (blog.user ) ? blog.user.name : ''} <br />
        { user && (blog.user.id === user.userId) && <button onClick={handleDelete}>delete</button>}
      </div>
    </div>
  )}

export default Blog