import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const AllBooks = ({ auth }) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios
      .get('https://books-api.glitch.me/api/books', {
        auth: auth
      })
      .then((response) => {
        setBooks(response.data.books)
      })
  }, [auth])

  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <div className='Books'>
      <center>
        <h1>Your Book Library</h1>
      </center>
      {books.map((book) => (
        <div key={book._id}>
          <center>
            <h2>
              <Link to={'/book/' + book._id}>{book.title}</Link>
            </h2>
          </center>
          <center>
            <p>{book.text}</p>
          </center>
          <center>
            <p>Written by {book.authors}</p>
          </center>
        </div>
      ))}
    </div>
  )
}

export default AllBooks
