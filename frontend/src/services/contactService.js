import api from '@/lib/axios'

export const contactService = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await api.get('/contacts')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get a single contact
  getContact: async (id) => {
    try {
      const response = await api.get(`/contacts/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Create a new contact
  createContact: async (contactData) => {
    try {
      const response = await api.post('/contacts', contactData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Update a contact
  updateContact: async (id, contactData) => {
    try {
      const response = await api.put(`/contacts/${id}`, contactData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Delete a contact
  deleteContact: async (id) => {
    try {
      const response = await api.delete(`/contacts/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
} 