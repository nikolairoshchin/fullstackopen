import { useSelector, useDispatch } from 'react-redux'
import { voteChange } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    state => state.anecdotes
    .filter(item => item.content
        .includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteChange(id))
    const anecdote = anecdotes.find(n => n.id === id)
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
  
}

export default AnecdoteList