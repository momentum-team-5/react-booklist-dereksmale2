import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

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

  const DeleteBook = () => {
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
        <p>{book.authors}</p>
      </center>
      <center>
        <p>{book.text}</p>
      </center>
      <center>
        <div>
          <button onClick={DeleteBook}>
            Remove this book from your account
          </button>
        </div>
      </center>
    </div>
  )
}

export default OneBook
