import React from 'react'
import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { useUser, SignIn } from '@clerk/clerk-react'

const Layout = () => {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const { user } = useUser();

    return user ? (
        <div className='flex flex-col items-start justify-start min-h-screen bg-slate-50'>
            {/* Navigation */}
            <nav className='w-full flex items-center justify-between px-6 sm:px-8 xl:px-12 py-2 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 fixed z-30 top-0'>
                <img onClick={() => navigate('/')} src={assets.logo} alt="QuickAI Logo" className="cursor-pointer" />
                <button
                    onClick={() => setSidebar(!sidebar)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                >
                    {sidebar ? 
                        <X className='w-6 h-6 text-slate-600'/> :
                        <Menu className='w-6 h-6 text-slate-600' />
                    }
                </button>
            </nav>

            {/* Sidebar */}
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            
            {/* Overlay for mobile */}
            {sidebar && (
                <div 
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 lg:hidden" 
                    onClick={() => setSidebar(false)}
                />
            )}

            {/* Main content */}
            <div className={`w-full flex items-start justify-start mt-12 transition-all duration-300 ${sidebar ? 'lg:ml-80' : ''}`}>
                <div className={`w-full max-w-7xl mx-auto px-4 sm:px-20 xl:px-32 py-8 transition-all duration-300`}>
                    <Outlet />
                </div>
            </div>
        </div>
    ):(
      <div className='flex items-center justify-center min-h-screen bg-slate-50'>
        <SignIn></SignIn>
      </div>
    )
}

export default Layout