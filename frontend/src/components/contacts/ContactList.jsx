import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FiUser, FiMail, FiPhone, FiSearch, FiEdit2, FiTrash2, FiStar, FiUsers } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { contactService } from '@/services/contactService'
import EditContactModal from './EditContactModal'

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const { user } = useAuth()

  // Load favorites and groups from localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('contactGroups')
    return savedGroups ? JSON.parse(savedGroups) : {}
  })

  useEffect(() => {
    fetchContacts()
  }, [])

  // Save favorites and groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('contactGroups', JSON.stringify(groups))
  }, [groups])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await contactService.getAllContacts()
      // Add favorite and group status to contacts
      const contactsWithStatus = data.map(contact => ({
        ...contact,
        isFavorite: favorites.includes(contact._id),
        groups: groups[contact._id] || []
      }))
      setContacts(contactsWithStatus)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(contactId)
        setContacts(contacts.filter(contact => contact._id !== contactId))
        // Remove from favorites and groups if present
        setFavorites(prev => prev.filter(id => id !== contactId))
        const newGroups = { ...groups }
        delete newGroups[contactId]
        setGroups(newGroups)
        toast.success('Contact deleted successfully')
      } catch (error) {
        toast.error(error.message || 'Failed to delete contact')
      }
    }
  }

  const handleUpdate = async (updatedContact) => {
    try {
      // Update the contact in the state with the response from the modal
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact._id === updatedContact._id ? {
            ...updatedContact,
            isFavorite: favorites.includes(updatedContact._id),
            groups: groups[updatedContact._id] || []
          } : contact
        )
      )
      // Refresh the contacts list to ensure we have the latest data
      await fetchContacts()
      toast.success('Contact updated successfully')
    } catch (error) {
      toast.error('Failed to update contact')
    }
  }

  const handleFavorite = (contactId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
      
      // Update the contact's favorite status in the state
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact._id === contactId
            ? { ...contact, isFavorite: !contact.isFavorite }
            : contact
        )
      )
      
      return newFavorites
    })
    toast.success('Favorite status updated')
  }

  const handleAddToGroup = (contactId) => {
    const groupName = prompt('Enter group name:')
    if (groupName) {
      setGroups(prev => {
        const newGroups = { ...prev }
        if (!newGroups[contactId]) {
          newGroups[contactId] = []
        }
        if (!newGroups[contactId].includes(groupName)) {
          newGroups[contactId] = [...newGroups[contactId], groupName]
        }
        return newGroups
      })

      // Update the contact's groups in the state
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact._id === contactId
            ? {
                ...contact,
                groups: [...(contact.groups || []), groupName]
              }
            : contact
        )
      )
      toast.success('Contact added to group')
    }
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
          <h1 className="text-2xl font-bold">All Contacts</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search contacts..."
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
          {searchQuery ? 'No contacts found matching your search' : 'No contacts found'}
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
                      onClick={() => handleFavorite(contact._id)}
                      className={contact.isFavorite ? 'text-yellow-500' : 'text-gray-400'}
                    >
                      <FiStar className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddToGroup(contact._id)}
                    >
                      <FiUsers className="h-4 w-4" />
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
                  {contact.groups && contact.groups.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {contact.groups.map((group, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  )}
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

export default ContactList 