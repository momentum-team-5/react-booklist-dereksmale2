import './App.css'
import 'tachyons'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AllBooks from './components/AllBooks'
import { useLocalStorage } from './hooks'

const App = () => {
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div className='App'>
        {auth && (
          <div>
            <span>Logged in as: {auth.username}</span> |{' '}
            <button onClick={() => setAuth(null)}>Log out</button>
          </div>
        )}
        <Switch>
          <Route path='/signup'>
            <Register auth={auth} onRegister={setAuth} />
          </Route>

          <Route path='/login'>
            <Login auth={auth} onLogin={setAuth} />
          </Route>

          <Route path='/'>
            <AllBooks auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
