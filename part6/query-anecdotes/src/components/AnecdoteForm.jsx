import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../services/requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch]= useContext(NotificationContext)

  const showMessage = (message) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000) 
  }

  const newMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
    showMessage(`too short anecdote, must be length 5 or more`)
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({ content, votes:0 })
    showMessage(`you added "${content}"`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
