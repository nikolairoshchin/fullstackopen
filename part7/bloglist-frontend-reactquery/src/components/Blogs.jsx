import { useState, useContext, useRef } from 'react'
import BlogContext from '../context/BlogContext'
import UserContext from '../context/UserContext'

import Togglable from './Togglable'
import CreateNewBlogForm from './CreateNewBlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Blogs = () => {
  const [blogs, blogsDispatch] = useContext(BlogContext)
  const [user, userDispatch] = useContext(UserContext)
  const [sortedView, setSortedView] = useState(true)
  const blogFormRef = useRef();

  const handleSort = () => {
    const newArray = [].concat(blogs)
    sortedView
      ? newArray.sort((a, b) => b.likes - a.likes)
      : newArray.sort((a, b) => {
        if (a.id > b.id) {
          return 1
        }
        if (a.id < b.id) {
          return -1
        }
        return 0
      })
      blogsDispatch({ type: 'setBlogs', payload: newArray })
    setSortedView(!sortedView)
  }



  return (
    <div>
      {user === null ?
      null :
        <div>
          <Togglable buttonLabel='new blog' ref = {blogFormRef} >
            <CreateNewBlogForm blogFormRef = {blogFormRef} />
          </Togglable>
        </div>
      }

      <button onClick={handleSort}>
        { sortedView ? 'sort' : 'unsort' }
      </button>
      <div data-testid='blogList'>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to={ `/blogs/${blog.id}` } >{blog.title}</Link>
            </td>
          </tr>
          )}
        </tbody>
      </Table>
      </div>
    </div>
  )
}

export default Blogs