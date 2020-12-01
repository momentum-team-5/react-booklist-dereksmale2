import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Redirect } from 'react-router-dom'
import { WithContext as ReactTags } from 'react-tag-input' // https://github.com/prakhar1989/react-tags#readme

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const EditBook = ({ auth }) => {
  const { id } = useParams()
  const [book, setBook] = useState({})
  const [authors, setAuthors] = useState([])
  const [newStatus, setNewStatus] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios
      .get('https://books-api.glitch.me/api/books/', {
        auth: auth
      })
      .then((response) => {
        const books = response.data.books
        const newBook = books.find((book) => book._id === id)

        setAuthors(
          newBook?.authors.map((author, index) => {
            return { id: index.toString(), text: author }
          }) || []
        )
        setBook(newBook)
      })
  }, [auth, id])

  const handleSubmit = () => {
    const { title } = book

    axios
      .put(
        'https://books-api.glitch.me/api/books/' + id,
        {
          title,
          authors: authors.map((author) => author.text)
        },
        { auth }
      )
      .then((response) => {
        setSubmitted(true)
      })
  }

  if (submitted) {
    return <Redirect to='/' />
  }

  const handleInput = (value, type) => {
    const bookCopy = { ...book }
    bookCopy[type] = value
    setBook(bookCopy)
  }

  const handleDelete = (i) => {
    setAuthors(authors.filter((author, index) => index !== i))
  }

  const handleAddition = (author) => {
    setAuthors([...authors, author])
  }

  const handleDrag = (author, currPos, newPos) => {
    const authorsCopy = [...authors]
    const newAuthors = authorsCopy.slice()

    newAuthors.splice(currPos, 1)
    newAuthors.splice(newPos, 0, author)

    setAuthors(authors)
  }

  return (
    <div>
      <center>
        <label>Title</label>
        <input
          type='text'
          required
          id='title'
          value={book.title}
          onChange={(e) => {
            handleInput(e.target.value, 'title')
          }}
        />
        <br />
        <label>Authors:</label>
        <ReactTags
          tags={authors}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          delimiters={delimiters}
        />
        <input
          type='radio'
          onChange={() => {
            setNewStatus(book.status)
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </center>
    </div>
  )
}

export default EditBook