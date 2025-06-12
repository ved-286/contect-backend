import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FiUser, FiMail, FiPhone, FiSearch, FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { contactService } from '@/services/contactService'
import EditContactModal from './EditContactModal'

const Favorites = () => {
  const [contacts, setContacts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const { user } = useAuth()

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await contactService.getAllContacts()
      // Filter only favorite contacts
      const favoriteContacts = data.filter(contact => favorites.includes(contact._id))
      setContacts(favoriteContacts)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch favorite contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(contactId)
        setContacts(contacts.filter(contact => contact._id !== contactId))
        // Remove from favorites
        setFavorites(prev => prev.filter(id => id !== contactId))
        localStorage.setItem('favorites', JSON.stringify(favorites.filter(id => id !== contactId)))
        toast.success('Contact deleted successfully')
      } catch (error) {
        toast.error(error.message || 'Failed to delete contact')
      }
    }
  }

  const handleUpdate = async (updatedContact) => {
    try {
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact._id === updatedContact._id ? updatedContact : contact
        )
      )
      toast.success('Contact updated successfully')
    } catch (error) {
      toast.error('Failed to update contact')
    }
  }

  const handleRemoveFavorite = (contactId) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== contactId)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
    setContacts(prevContacts => prevContacts.filter(contact => contact._id !== contactId))
    toast.success('Contact removed from favorites')
  }

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Favorite Contacts</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search favorites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? 'No contacts found matching your search' : 'No favorite contacts yet'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <Card key={contact._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    <FiUser className="text-blue-500" />
                    {contact.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFavorite(contact._id)}
                      className="text-yellow-500"
                    >
                      <FiStar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail />
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPhone />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingContact(contact)}
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editingContact && (
        <EditContactModal
          isOpen={!!editingContact}
          onClose={() => setEditingContact(null)}
          contact={editingContact}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default Favorites 