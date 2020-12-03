import React, { useState } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

const Login = ({ auth, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    axios
      .get('https://books-api.glitch.me/api/users', {
        auth: {
          username: username,
          password: password
        }
      })
      .then((response) => {
        onLogin({ username, password })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (auth) {
    return <Redirect to='/' />
  }

  return (
    <div className='Login'>
      <center>
        <h1>
          Log In or <Link to='/signup'>Sign Up</Link>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              required
              type='text'
              id='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              required
              type='password'
              id='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button type='submit'>Log In</button>
          </div>
        </form>
      </center>
    </div>
  )
}

export default Login
