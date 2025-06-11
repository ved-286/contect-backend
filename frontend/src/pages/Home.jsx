import React from 'react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { FiUsers, FiUserPlus, FiSearch, FiTrash } from 'react-icons/fi'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className='flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8 pt-8'>
      <div className='text-center max-w-4xl mx-auto'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>
          Manage Your Contacts
        </h1>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 mt-2'>
          Effortlessly
        </h1>
        <p className='text-base sm:text-lg text-gray-500 mt-4 max-w-2xl mx-auto'>
          A modern, intuitive contact management app that helps you organize, search, and manage all your contacts in one place. Simple, fast, and reliable.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 w-full'>
          <Button className='w-full sm:w-auto px-8 py-2 text-base sm:text-lg'>
            View Contacts
          </Button>
          <Button className='w-full sm:w-auto px-8 py-2 text-base sm:text-lg'>
            Add Contact 
          </Button>
        </div>
      </div>
    </div>
    <div className='h-screen bg-[#E5ECFF] py-10'>
      <div className='flex flex-col text-center items-center justify-center mb-8 px-2'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Everything you need to manage contacts</h2>
        <span className='text-base sm:text-lg mt-3 text-gray-500'>Powerful features designed to make contact management simple and efficient.</span>
      </div>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* View All Contacts */}
          <Link to="/contacts" className="h-full w-full">
            <Card className="h-full w-full hover:shadow-lg transition-shadow cursor-pointer text-center p-6 flex flex-col">
              <CardHeader className="flex flex-col items-center flex-grow">
                <span className="bg-blue-100 rounded-lg p-3 mb-2">
                  <FiUsers className="text-3xl text-blue-500" />
                </span>
                <CardTitle className="text-xl sm:text-2xl font-bold">View All Contacts</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>
                  Browse through all your contacts in a clean, organized interface with search functionality.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          {/* Add Contact */}
          <Link to="/contacts/new" className="h-full w-full">
            <Card className="h-full w-full hover:shadow-lg transition-shadow cursor-pointer text-center p-6 flex flex-col">
              <CardHeader className="flex flex-col items-center flex-grow">
                <span className="bg-green-100 rounded-lg p-3 mb-2">
                  <FiUserPlus className="text-3xl text-green-500" />
                </span>
                <CardTitle className="text-xl sm:text-2xl font-bold">Add Contact</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>
                  Easily add new contacts with detailed information and save them for future reference.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          {/* Search Contacts */}
          <Link to="/contacts/search" className="h-full w-full">
            <Card className="h-full w-full hover:shadow-lg transition-shadow cursor-pointer text-center p-6 flex flex-col">
              <CardHeader className="flex flex-col items-center flex-grow">
                <span className="bg-blue-100 rounded-lg p-3 mb-2">
                  <FiSearch className="text-3xl text-blue-500" />
                </span>
                <CardTitle className="text-xl sm:text-2xl font-bold">Search Contacts</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>
                  Quickly search through your contacts using various filters and keywords.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          {/* Delete Contact */}
          <Link to="/contacts/delete" className="h-full w-full">
            <Card className="h-full w-full hover:shadow-lg transition-shadow cursor-pointer text-center p-6 flex flex-col">
              <CardHeader className="flex flex-col items-center flex-grow">
                <span className="bg-red-100 rounded-lg p-3 mb-2">
                  <FiTrash className="text-3xl text-red-500" />
                </span>
                <CardTitle className="text-xl sm:text-2xl font-bold">Delete Contact</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>
                  Remove outdated contacts with confirmation dialogs to prevent accidental deletions.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
    <div className='h-[60vh] bg-[#4F46E5] flex items-center justify-center px-2 py-10'>
      <div className='flex flex-col items-center justify-center w-full max-w-2xl'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center'>Ready to get started?</h2>
        <span className='text-base sm:text-lg mt-3 text-white text-center'>Start managing your contacts today with our simple and intuitive app.</span>
        <Button className='mt-4 bg-white text-black w-full sm:w-1/2 hover:bg-white/80 text-base sm:text-lg'>Get Started</Button>
      </div>
    </div>
    </>
  )
}

export default Home