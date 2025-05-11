import { useState, useContext, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { Table } from 'react-bootstrap'
import UsersContext from '../context/UsersContext'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, usersDispatch] = useContext(UsersContext)

  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {users.map(person =>
              <tr key = {person.id} >
                <td>
                  <Link to={ `/users/${person.id}` } >{person.name}</Link>
                </td>
                <td> 
                  {(person.blogs).length} 
                </td>
              </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users