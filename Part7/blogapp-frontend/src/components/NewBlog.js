import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const NewBlog = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = React.createRef()

  const notifyWith = (message, type='success') => {
    dispatch(setNotification({
      message, type
    },5))
  }

  const createBlog = async (blog) => {
    try {
      dispatch(createNewBlog(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleNewBlog = (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            author
            <input
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            title
            <input
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            url
            <input
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create">create</button>
        </form>
      </div>
    </Togglable>
  )
}

export default NewBlog