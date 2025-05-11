import { useState, useContext } from "react";
import { useNotification } from "../services/useNotification";
import UserContext from '../context/UserContext'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, userDispatch] = useContext(UserContext)
  const setNotification = useNotification()

  const handleLogin = async ( event ) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username, password,
        })
  
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        userDispatch({ type: 'setUser', payload: user})
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
      } catch (exeption) {
        setNotification('wrong username or password', 'box error')
      }
    }

 return (
      <Form inline="true" onSubmit={handleLogin}>
          <Row className="align-items-center">
            <Col xs="auto">
                <Form.Control
                  placeholder="Username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
            </Col>
            <Col xs="auto">
                <Form.Control
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                />
            
            </Col>
            <Col xs="auto">
              <Button type="submit" size="sm">Login</Button>
            </Col>
          </Row>
      </Form>
  )};

export default Login;
