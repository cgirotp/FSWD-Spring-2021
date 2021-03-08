import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTE':
      const id = action.data
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes+1
      }
      return state.map(note =>
        note.id !== id ? note : changedAnecdote 
      )
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVote = (id,votes,content) => {
  const updatedAnecdote = {
    content: content,
    votes: votes+1,
    id: id
  }
  return async dispatch => {
    anecdoteService.update(id,updatedAnecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: id
    })
  }
}

export default anecdoteReducer