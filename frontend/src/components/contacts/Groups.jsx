import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FiUser, FiMail, FiPhone, FiSearch, FiEdit2, FiTrash2, FiUsers, FiX } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { contactService } from '@/services/contactService'
import EditContactModal from './EditContactModal'

const Groups = () => {
  const [contacts, setContacts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const { user } = useAuth()

  // Load groups from localStorage
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('contactGroups')
    return savedGroups ? JSON.parse(savedGroups) : {}
  })

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await contactService.getAllContacts()
      // Add group information to contacts
      const contactsWithGroups = data.map(contact => ({
        ...contact,
        groups: groups[contact._id] || []
      }))
      setContacts(contactsWithGroups)
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
        // Remove from groups
        const newGroups = { ...groups }
        delete newGroups[contactId]
        setGroups(newGroups)
        localStorage.setItem('contactGroups', JSON.stringify(newGroups))
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
          contact._id === updatedContact._id ? {
            ...updatedContact,
            groups: groups[updatedContact._id] || []
          } : contact
        )
      )
      toast.success('Contact updated successfully')
    } catch (error) {
      toast.error('Failed to update contact')
    }
  }

  const handleRemoveFromGroup = (contactId, groupName) => {
    setGroups(prev => {
      const newGroups = { ...prev }
      if (newGroups[contactId]) {
        newGroups[contactId] = newGroups[contactId].filter(g => g !== groupName)
        if (newGroups[contactId].length === 0) {
          delete newGroups[contactId]
        }
      }
      localStorage.setItem('contactGroups', JSON.stringify(newGroups))
      return newGroups
    })

    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact._id === contactId
          ? {
              ...contact,
              groups: contact.groups.filter(g => g !== groupName)
            }
          : contact
      )
    )
    toast.success('Contact removed from group')
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
        localStorage.setItem('contactGroups', JSON.stringify(newGroups))
        return newGroups
      })

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

  // Get all unique groups
  const allGroups = Array.from(
    new Set(
      Object.values(groups).flat()
    )
  )

  const filteredContacts = contacts.filter(contact => 
    (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)) &&
    contact.groups.length > 0
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Group Contacts</h1>
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
          {searchQuery ? 'No contacts found matching your search' : 'No contacts in groups yet'}
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
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center gap-1"
                        >
                          {group}
                          <button
                            onClick={() => handleRemoveFromGroup(contact._id, group)}
                            className="hover:text-red-500"
                          >
                            <FiX className="h-3 w-3" />
                          </button>
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

export default Groups 