import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'

const BlogList = (username) => {

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)

    const handleLike = async (id) => {
        const blogToLike = blogs.find(b => b.id === id)
        const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
        dispatch(addLike(id,likedBlog))
    }
    
    const handleRemove = async (id) => {
        const blogToRemove = blogs.find(b => b.id === id)
        const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
        if (ok) {
          dispatch(removeBlog(id))
        }
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div>
            {blogs.sort(byLikes).map(blog =>
            <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={username.username===blog.user.username}
            />
      )}
        </div>
    )
}

export default BlogList