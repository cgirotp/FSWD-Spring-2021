import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleNewTitle = (event) => {
        setNewTitle(event.target.value)
    }
    const handleNewAuthor = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleNewUrl = (event) => {
        setNewUrl(event.target.value)
    }
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        id='newTitle'
                        type="text"
                        value={newTitle}
                        name="NewTitle"
                        onChange={handleNewTitle}
                    />
                </div>
                <div>
                    Author:
                    <input
                        id='newAuthor'
                        type="text"
                        value={newAuthor}
                        name="NewAuthor"
                        onChange={handleNewAuthor}
                    />
                </div>
                <div>
                    Url:
                    <input
                        id='newUrl'
                        type="text"
                        value={newUrl}
                        name="NewUrl"
                        onChange={handleNewUrl}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default BlogForm