import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FiUser, FiMail, FiPhone, FiPlus } from 'react-icons/fi'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Contact = () => {
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <h1>Contact</h1>
      {/* Main content goes here */}
    </div>
  )
}

export default Contact