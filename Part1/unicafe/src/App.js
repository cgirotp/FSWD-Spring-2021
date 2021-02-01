import React, { useState } from 'react'

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    
  )
}
const Statistics = (props) => {
  return(
    <table>
      <tbody>
        <Statistic text="good" value={props.good}/>
        <Statistic text="neutral" value={props.neutral}/>
        <Statistic text="bad" value={props.bad}/>
        <Statistic text="all" value={props.good+props.neutral+props.bad}/>
        <Statistic text="average" value={(props.good+props.bad*(-1))/(props.good+props.neutral+props.bad)}/>
        <Statistic text="positive" value={(props.good/(props.good+props.neutral+props.bad))*100+" %"}/>   
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.func}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  if (good+neutral+bad === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button func={handleGoodClick} text="good"/>
        <Button func={handleNeutralClick} text="neutral"/>
        <Button func={handleBadClick} text="bad"/>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button func={handleGoodClick} text="good"/>
      <Button func={handleNeutralClick} text="neutral"/>
      <Button func={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
