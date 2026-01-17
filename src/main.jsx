import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RefundProvider } from './context/RefundContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RefundProvider>
      <App />
    </RefundProvider>
  </StrictMode>,
)
