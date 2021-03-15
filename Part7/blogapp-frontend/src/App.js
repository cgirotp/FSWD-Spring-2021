import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import Users from './components/Users'

import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'

import { initializeBlog } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(initializeBlog()) 
  },[dispatch]) 

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  const notifyWith = (message, type='success') => {
    dispatch(setNotification({
      message, type
    },5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              type='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <p>{user.name} logged in </p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Switch>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/">
          <div>
            <NewBlog />
            <BlogList username={user.username}/>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App