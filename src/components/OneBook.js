import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams, Link } from 'react-router-dom'

const OneBook = ({ auth }) => {
  const { id } = useParams()
  const [book, setBook] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios
      .get('https://books-api.glitch.me/api/books/', {
        auth: auth
      })
      .then((response) => {
        const books = response.data.books
        setBook(books.find((book) => book._id === id))
      })
  }, [auth, id])

  const deleteBook = () => {
    axios
      .delete('https://books-api.glitch.me/api/books/' + id, {
        auth: auth
      })
      .then((response) => {
        setDeleted(true)
      })
  }

  if (deleted) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <center>
        <h1>{book.title}</h1>
      </center>

      <center>
        <h4>Written by: {book.authors + ' '}</h4>
      </center>

      <center>
        <p>Current status: {book.status}</p>
      </center>

      <center>
        <div>
          <Link
            className='pl0 bw0 bg-white underline pointer blue'
            to={`/book/${book._id}/edit`}
          >
            Edit this book
          </Link>{' '}
          <button
            className='pl0 bw0 bg-white underline pointer blue'
            onClick={deleteBook}
          >
            Remove this book
          </button>
        </div>
      </center>
    </div>
  )
}

export default OneBook
