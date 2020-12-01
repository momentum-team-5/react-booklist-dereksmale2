import './App.css'
import 'tachyons'
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AllBooks from './components/AllBooks'
import OneBook from './components/OneBook'
import EditBook from './components/EditBook'
import AddBook from './components/AddBook'
import { useLocalStorage } from './Hooks'

const App = ({ book }) => {
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div className='App'>
        {auth && (
          <div>
            <center>
              <span>Logged in as: {auth.username}</span> |{' '}
              <Link className='pl0 bw0 bg-white underline pointer blue' to='/'>
                Home
              </Link>{' '}
              |{' '}
              <Link
                className='pl0 bw0 bg-white underline pointer blue'
                to='/book/add'
              >
                Add a Book
              </Link>{' '}
              |{' '}
              <button
                className='pl0 bw0 bg-white underline pointer blue'
                onClick={() => setAuth(null)}
              >
                Log out
              </button>
            </center>
          </div>
        )}
        <Switch>
          <Route exact path='/book/add'>
            <AddBook auth={auth} />
          </Route>

          <Route exact path='/book/:id/edit'>
            <EditBook auth={auth} />
          </Route>

          <Route exact path='/book/:id'>
            <OneBook auth={auth} />
          </Route>

          <Route exact path='/signup'>
            <Register auth={auth} onRegister={setAuth} />
          </Route>

          <Route exact path='/login'>
            <Login auth={auth} onLogin={setAuth} />
          </Route>

          <Route exact path='/'>
            <AllBooks auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
