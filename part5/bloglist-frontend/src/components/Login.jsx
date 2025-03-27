const handleLogin = ( event ) => {
  event.preventDefault()
  console.log('logging in with', username, password)
}

const Login = ({ username, setUsername, password, setPassword }) => (
  <form onSubmit={handleLogin}>
    <div>
        username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <div>
            password
        <input
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

export default Login