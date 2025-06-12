import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const ContactLayout = () => {
  return (
    <div className="h-screen flex">
      <div className="fixed h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default ContactLayout 