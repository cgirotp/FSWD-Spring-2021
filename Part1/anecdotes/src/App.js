import React, { useState } from 'react'

function indexMax(a) {
  var max = a[0];
  var maxIndex = 0;
  for (var i = 1; i < a.length; i++) {
      if (a[i] > max) {
          maxIndex = i;
          max = a[i];
      }
  }
  return maxIndex;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const randomSelected = () => {
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))
  }
  const addVote = () => {
    const copypoints = [...points]
    copypoints[selected] += 1
    setPoints(copypoints)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={addVote}>vote</button>
      <button onClick={randomSelected}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexMax(points)]}</p>
      <p>has {points[indexMax(points)]} votes</p>
    </div>
  )
}

export default App