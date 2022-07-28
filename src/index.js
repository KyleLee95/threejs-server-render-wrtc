import React from 'react'
import { App } from './App'
import './Home.scss'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.js'
const appElement = document.getElementById('app')
const root = createRoot(appElement)

export const rootRender = root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
)
