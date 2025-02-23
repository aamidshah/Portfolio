import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalStateProvider } from './context/GlobalStateContext.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalStateProvider>
    <App />
  </ GlobalStateProvider>
)
