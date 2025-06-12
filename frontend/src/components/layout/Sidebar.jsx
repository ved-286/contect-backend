import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

const Sidebar = () => {
  return (
    <>
    <div className='bg-[#E5ECFF] text-white h-screen w-64 flex flex-col'>
        <div className='flex items-center justify-center h-16'>
            <h1 className='text-3xl  text-black font-bold'>ContactHub</h1>
        </div>
        <nav className="px-4 py-2">
            <ul className="space-y-2">
                <li>
                    <Link 
                        to="/contacts" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <span className="text-lg">📇</span>
                        <span className='text-black font-bold'>All Contacts</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/contacts/add" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <span className="text-lg">➕</span>
                        <span className='text-black font-bold'>Add Contact</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/contacts/favorites" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <span className="text-lg">⭐</span>
                        <span className='text-black font-bold'>Favorites</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/contacts/groups" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <span className="text-lg">👥</span>
                        <span className='text-black font-bold'>Groups</span>
                    </Link>
                </li>
            </ul>
        </nav>
        <div className='mt-auto p-4'>
            <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
                <FiHome className="text-xl text-black" />
                <span className='text-black font-bold'>Back to Home</span>
            </Link>
        </div>
    </div>
    </>
  )
}

export default Sidebar