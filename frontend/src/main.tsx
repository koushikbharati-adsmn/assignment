import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'

import { Toaster } from './components/ui/sonner'

import LoginPage from './routes/Login'
import SignUp from './routes/SignUp'
import Workflows from './routes/Workflows'
import CreateWorkflow from './routes/CreateWorkflow'
import ProtectedRoute from './components/shared/ProtectedRoute'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Workflows />
      </ProtectedRoute>
    )
  },
  {
    path: '/new',
    element: (
      <ProtectedRoute>
        <CreateWorkflow />
      </ProtectedRoute>
    )
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'signup',
    element: <SignUp />
  }
])

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  )
}
