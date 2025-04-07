import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './services/requests'

const App = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch]= useContext(NotificationContext)
  
  const updateAnecdoteMutation = useMutation({ 
      mutationFn: updateAnecdote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({ type: 'SET', payload: `you voted "${anecdote.content}"` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000) 
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  
  if ( result.isError ) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
