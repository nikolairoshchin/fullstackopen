import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import UsersContext from '../context/UsersContext'

const User = () => {
  const { id } = useParams()
  const [users, usersDispatch] = useContext(UsersContext)

  const person = users.find(user => user.id === id)

  if (!person) {
    return <p>User not found...</p>
  }

  return (
    <div>
    <h1>{person.name}</h1>
    <h2>added blogs</h2>
    <ul>
      { (person.blogs).map(blog =>
        <li key = {blog.id}>
          {blog.title}
        </li>
    ) }
    </ul>
    </div>
  )}

export default User