import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createNew(content))
    dispatch(setNotification(`you added ${content}`, 5))
  }

    return (
      <>
        <h2>create new</h2>
        <form onSubmit={addNew}>
          <div><input name='newAnecdote' /></div>
          <button type='submit'>create</button>
        </form>
      </>
    )
}

export default AnecdoteForm