import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setErrorMessage(`New blog: ${returnedBlog.title} by ${returnedBlog.author}`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        blogService.getAll().then(blogs =>
            setBlogs( blogs ))
    }

    const updateBlog = (id,blogObject) => {
        const newBlog = {
            title: blogObject.title,
            author: blogObject.author,
            url: blogObject.url,
            likes: blogObject.likes
        }
        blogService
            .update(id,newBlog)
        blogService.getAll().then(blogs =>
            setBlogs( blogs ))
    }

    const deleteBlog = (id) => {
        blogService
            .del(id)
    }

    const loginForm = () => (
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
        />
    )

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel='create new blog' ref = {blogFormRef}>
            <BlogForm createBlog={addBlog}/>
        </Togglable>
    )

    if (user === null ) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={errorMessage} />
                {loginForm()}
            </div>
        )
    }

    return (
        <div>
            <div>
                <h2>Blogs</h2>
                <Notification message={errorMessage} />
                <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                </p>
            </div>
            <div>
                {blogForm()}
            </div>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} updateLikes={updateBlog} currentUser={user.name} delBlog={deleteBlog}/>
                )}
            </div>
        </div>
    )
}

export default App