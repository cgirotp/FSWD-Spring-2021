import React, { useState } from 'react'

const Blog = ({ blog,updateLikes,currentUser,delBlog }) => {
    const user = blog.user
    const [loginVisible, setLoginVisible] = useState(false)
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    const deletePossible = { display: (currentUser === user.name) ? '' : 'none' }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const changeLikes = () => {
        updateLikes(blog.id,{
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: Number(blog.likes)+1
        })
    }

    const deleteBlog = () => {
        const choice = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
        if (choice) {
            delBlog(blog.id)
        }
    }

    return(
        <div style={blogStyle}>
            <div style={hideWhenVisible} className='reducedBlog'>
                <p>{blog.title} {blog.author} <button onClick={() => setLoginVisible(true)}>show</button> </p>
            </div>
            <div style={showWhenVisible} className='detailedBlog'>
                <p>{blog.title} {blog.author} <button onClick={() => setLoginVisible(false)}>hide</button> </p>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button onClick={changeLikes}>like</button></p>
                <p>{user.name}</p>
                <div style={deletePossible}>
                    <button onClick={deleteBlog}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog
