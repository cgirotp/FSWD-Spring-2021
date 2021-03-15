import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"

const User =(props) => {
    const users = props.users
    const id = useParams().id
    const user = users.find(b => String(b.id) === String(id))
    if (!user) {
        return null
    }
    const blogs = user.blogs
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        {blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
        )}
      </div>
    )
  }

const Users = (props) => {
    const users = props.users
    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
            <Switch>
                <Route path="/users/:id">
                    <User users={users} />
                </Route>
                <Route path="/users">
                    <h2>Users</h2>
                    <table>
                        <tr>
                            <th>{null}</th>
                            <th>Blogs created</th>
                        </tr>
                        {users.map((user) => 
                            <tr key={user.id}>
                                <td><Link style={padding} to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                    </table>
                </Route>
            </Switch>
        </Router>
    )
}

export default Users