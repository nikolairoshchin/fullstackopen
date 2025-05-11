import { useEffect, useRef, useContext } from 'react'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Notification from './components/Notification'
import blogService from './services/blogs'
import usersService from './services/users'
import User from './components/User'
import Blog from './components/Blog'

import { useQuery } from '@tanstack/react-query'
import NotificationContext from './context/NotificationContext'
import { useNotification } from './services/useNotification'
import BlogContext from './context/BlogContext'
import UserContext from './context/UserContext'
import UsersContext from './context/UsersContext'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch,
  useParams,
  useNavigate
} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap'

const App = () => {
  const [blogs, blogsDispatch] = useContext(BlogContext)
  const [user, userDispatch] = useContext(UserContext)
  const [users, usersDispatch] = useContext(UsersContext)

  const createNewBlogFormRef = useRef()
  const setNotification = useNotification()

  const loadBlogs = useQuery ({
      queryKey: ['blogs'],
      queryFn: async() => {
        try {
          const result = await blogService.getAll()
            blogsDispatch({ type: 'setBlogs', payload: result })
            return result
        } catch (error) {
            console.log(error)
        }
      },
      refetchOnWindowFocus: false
   })

   const loadUsers = useQuery ({
    queryKey: ['users'],
    queryFn: async() => {
      try {
        const result = await usersService.getAll()
          usersDispatch({ type: 'setUsers', payload: result})
          return result
      } catch (error) {
          console.log(error)
      }
    },
    refetchOnWindowFocus: false
 })

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleLogout = () => {
    window.localStorage.clear()
    userDispatch({ type: 'setUser', payload: null})
    window.location.reload()
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'setUser', payload: user})
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <div className = 'container'>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
          {user === null ?
          <Login /> :
          <span>
            {user.name} logged in  
            <Button onClick={handleLogout} size="sm">
              logout
            </Button>
          </span>
          }
        </Container>
      </Navbar>
      
    <h2>blogs</h2>
      <Notification />
      
    <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={<Blogs />} />
    </Routes>
    </div>
  )
}

export default App