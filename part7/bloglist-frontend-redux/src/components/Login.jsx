import { useDispatch } from "react-redux";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from '../reducers/userReducer'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = dispatch(loginUser({
        username,
        password,
      }))
      setUsername("");
      setPassword("");
    } catch (exeption) {
      dispatch(setNotification("wrong username or password", "box error"))
    }
  };

 return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>

      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </div>
    </form>
  )};

export default Login;
