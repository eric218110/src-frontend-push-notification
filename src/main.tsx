import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { LoginPage } from './presentation/pages/login'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
)
