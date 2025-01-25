import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
      <p>{text} {value}</p>
  )
}

const Statistic = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  let average = 0
  let positive = 0
  if ( all > 0 ) {
    average = (good - bad)/all
    positive = good/all*100 + ' %'
    return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
   )
  }
  return (
    <p>No feedback given</p>
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
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App