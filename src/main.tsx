import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MainProviders } from './presentation/providers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainProviders />
  </React.StrictMode>
)
