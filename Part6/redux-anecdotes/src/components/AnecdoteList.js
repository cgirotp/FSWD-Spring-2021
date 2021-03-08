import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'
import Notification from './Notification'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()


    const anecdotes = useSelector(({ filter, anecdotes }) => {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    const vote = (id,votes,content) => {
      dispatch(addVote(id,votes,content))
      dispatch(setNotification(`You voted for the anecdote "${content}"`,5))
    }
  
    return (
        <div>
            <Notification />
            {anecdotes
              .sort((a,b) => a.votes-b.votes)
              .reverse()
              .map(anecdote =>
                  <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  handleClick={() => vote(anecdote.id,anecdote.votes,anecdote.content)}
                  />
              )
            }
        </div>
    )
  }
  
  export default AnecdoteList