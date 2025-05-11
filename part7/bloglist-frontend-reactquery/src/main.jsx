import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/NotificationContext'
import { BlogContextProvider } from './context/BlogContext'
import { UserContextProvider } from './context/UserContext'
import { UsersContextProvider }from './context/UsersContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
    <NotificationContextProvider>
        <UserContextProvider>
            <UsersContextProvider>
            <BlogContextProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </BlogContextProvider>
            </UsersContextProvider>
        </UserContextProvider>
    </NotificationContextProvider>
    </Router>
)