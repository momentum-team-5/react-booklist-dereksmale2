import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { WithContext as ReactTags } from 'react-tag-input' // https://github.com/prakhar1989/react-tags#readme

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const AddBook = ({ auth }) => {
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState([])
  const [newStatus, setNewStatus] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    axios
      .post(
        'https://books-api.glitch.me/api/books/',
        {
          title,
          authors: authors.map((author) => author.text),
          status: newStatus
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
        <div className='pt3'>
          <label>
            Title:{' '}
            <input
              type='text'
              required
              id='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Authors:
            <ReactTags
              tags={authors}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              delimiters={delimiters}
            />
          </label>
        </div>
        <br />
        <form>
          <div>
            <label>
              <input
                type='radio'
                value='toread'
                name='toread'
                checked={newStatus === 'toread'}
                onChange={(e) => {
                  setNewStatus(e.target.value)
                }}
              />
              To Read
            </label>
          </div>
          <br />
          <div>
            <label>
              <input
                type='radio'
                value='reading'
                name='reading'
                checked={newStatus === 'reading'}
                onChange={(e) => {
                  setNewStatus(e.target.value)
                }}
              />
              Reading
            </label>
          </div>
          <br />
          <div>
            <label>
              <input
                type='radio'
                value='read'
                name='read'
                checked={newStatus === 'read'}
                onChange={(e) => {
                  setNewStatus(e.target.value)
                }}
              />
              Read
            </label>
          </div>
        </form>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </center>
    </div>
  )
}

export default AddBook
