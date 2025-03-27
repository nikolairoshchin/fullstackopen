import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('box message')
  const [sortedView, setSortedView] = useState(true)
  const blogFormRef = useRef()
  const createNewBlogFormRef = useRef()

  const handleLogin = async ( event ) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      setMessage('wrong username or password')
      setMessageStyle('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser('null')
    window.location.reload()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>

      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
        password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </div>
    </form>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

    setBlogs(newArray)
    setSortedView(!sortedView)
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
      setBlogs(blogs.map(item => item.id === blog.id ? response : item))
    } catch (exeption) {}
  }

  const handleDelete = async (event, blog) => {
    event.preventDefault()
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        const response = await blogService.remove(blog.id)
        setBlogs(blogs.filter(item => item.id !== blog.id))
      } catch (exeption) {}
    }
  }

  const handleCreateNewBlog = async (event, title, author, url) => {
      event.preventDefault()
      const newBlog = {
        title,
        author,
        url
      }
      try {
        const response = await blogService.create(newBlog)
        setBlogs(blogs.concat(response))
        createNewBlogFormRef.current.clearForm()
        blogFormRef.current.toggleVisibility()
        setMessage(`New blog ${response.title} by ${response.author} added`)
        setMessageStyle('message')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      } catch (exeption) {
        console.log(exeption)
      }
    }

  return (
    <div>
      <Notification message={message} messageStyle={`box ${messageStyle}`}/>
      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>
            logout
            </button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef} >
            <CreateNewBlogForm
              handleCreateNewBlog={handleCreateNewBlog}
              ref={createNewBlogFormRef}
            />
          </Togglable>
        </div>
      }

      <h2>blogs</h2>
      <button onClick={handleSort}>
        { sortedView ? 'sort' : 'unsort' }
      </button>
      <div data-testid='blogList'>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={(event) => handleLike(event, blog)}
            handleDelete={(event) => handleDelete(event, blog)}
            user={user} />
        )}
      </div>
    </div>
  )
}

export default App