import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/usuarios' element={<UsersPage />} />
        <Route path='*' element={<Navigate to='/usuarios' />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
