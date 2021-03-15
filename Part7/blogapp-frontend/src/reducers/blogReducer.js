import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
        const idR = action.data
        return state.filter(blog => blog.id !== idR)
    case 'ADD_LIKE':
      const id = action.data
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { 
        ...blogToChange, 
        likes: blogToChange.likes+1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog 
      )
    default:
      return state
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNewBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = id => {
    return async dispatch => {
      blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
    }
  }

export const addLike = (id,updatedBlog) => {
  return async dispatch => {
    blogService.update(updatedBlog)
    dispatch({
      type: 'ADD_LIKE',
      data: id
    })
  }
}

export default blogReducer