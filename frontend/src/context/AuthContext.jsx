import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check authentication status on mount and token change
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const response = await api.get('/users/current')
          setUser(response.data)
          setToken(storedToken)
        } catch (error) {
          // If token is invalid, clear everything
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password })
      const { accessToken: newToken, user: userData } = response.data
      
      // Store token and user data
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(userData)
      
      // Redirect to contacts page
      navigate('/home')
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      await api.post('/users/register', { name, email, password })
      // After successful registration, automatically log in
      return await login(email, password)
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  // If still checking authentication status, show loading
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      login, 
      register, 
      logout,
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 