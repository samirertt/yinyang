import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/styles/colors.css';
import App from './App.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
