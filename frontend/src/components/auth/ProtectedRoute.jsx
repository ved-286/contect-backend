import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute 