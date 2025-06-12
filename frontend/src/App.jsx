import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ContactLayout from './components/layout/ContactLayout'
import ContactList from './components/contacts/ContactList'
import AddContact from './components/contacts/AddContact'
import Favorites from './components/contacts/Favorites'
import Groups from './components/contacts/Groups'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Public Route wrapper (redirects to contacts if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : <Navigate to="/contacts" replace />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Protected Contact Routes */}
      <Route path="/contacts" element={
        <ProtectedRoute>
          <ContactLayout />
        </ProtectedRoute>
      }>
        <Route index element={<ContactList />} />
        <Route path="add" element={<AddContact />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="groups" element={<Groups />} />
      </Route>

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App