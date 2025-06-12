import api from '@/lib/axios'

export const authService = {
  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token found')
      }

      const response = await api.post('/users/refresh-token', {
        refreshToken
      })

      const { accessToken, refreshToken: newRefreshToken } = response.data

      // Update tokens in localStorage
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)

      return accessToken
    } catch (error) {
      // If refresh fails, clear everything and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
      throw error
    }
  },

  // Check if token is expired
  isTokenExpired: (token) => {
    if (!token) return true
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now()
    } catch {
      return true
    }
  }
} 