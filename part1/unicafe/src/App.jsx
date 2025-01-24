import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const summa = good + neutral + bad
  let average = 0
  let positive = 0
  if (summa > 0) {
    average = (good - bad)/summa
    positive = good/summa*100
  }
  if (summa === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {summa}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>{setGood(good+1)}} text="good"/>
      <Button onClick={()=>{setNeutral(neutral+1)}} text="neutral"/>
      <Button onClick={()=>{setBad(bad+1)}} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App