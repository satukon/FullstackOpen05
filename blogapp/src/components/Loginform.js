import React from 'react'

const Loginform = ({ handleLogin }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (

    <div>

      <h2>Log in</h2>

      <form onSubmit={handleSubmit}>

        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            autoComplete="current-password"
          />
        </div>

        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">login</button>

      </form>

    </div>
  )
}

export default Loginform