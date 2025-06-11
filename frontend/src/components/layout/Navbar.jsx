import React, { useState, useEffect } from 'react'
import { FcContacts } from "react-icons/fc";
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link to="/" className='flex items-center gap-3 group'>
            <div className='p-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:scale-110 transition-transform'>
              <FcContacts className='text-2xl text-white' />
            </div>
            <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              ContactHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            <div className='flex items-center gap-6'>
              <Link 
                to='/' 
                className={`relative px-2 py-1 font-medium transition-colors ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
                {isActive('/') && (
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full' />
                )}
              </Link>
              <Link 
                to='/contacts' 
                className={`relative px-2 py-1 font-medium transition-colors ${
                  isActive('/contacts') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Contacts
                {isActive('/contacts') && (
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full' />
                )}
              </Link>
              <Link 
                to='/dashboard' 
                className={`relative px-2 py-1 font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Dashboard
                {isActive('/dashboard') && (
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full' />
                )}
              </Link>
            </div>
            <div className='flex items-center gap-4'>
              <Button variant="ghost" className='flex items-center gap-2 hover:bg-blue-50'>
                <FiUser className='text-lg' />
                <span>Sign In</span>
              </Button>
              <Button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all'>
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100'>
          <div className='px-4 py-4 space-y-4'>
            <Link 
              to='/' 
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to='/contacts' 
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/contacts') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contacts
            </Link>
            <Link 
              to='/dashboard' 
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className='pt-4 border-t border-gray-100 space-y-3'>
              <Button variant="ghost" className='w-full justify-start gap-2'>
                <FiUser className='text-lg' />
                <span>Sign In</span>
              </Button>
              <Button className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar