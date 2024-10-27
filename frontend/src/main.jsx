import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import  './styles/output.css'
import { AuthProvider } from './context/authctx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
      <App />
      </AuthProvider>
  </StrictMode>,
)
