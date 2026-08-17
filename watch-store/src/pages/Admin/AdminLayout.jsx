import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminLayout = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/products', label: 'Manage Products' },
    { path: '/admin/orders', label: 'Manage Orders' },
    { path: '/admin/messages', label: 'Messages' },
     { path: '/admin/newsletter', label: 'Newsletter' },
  ]

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>

      {/* Sidebar */}
      <aside className='w-full md:w-64 bg-gray-900 text-white flex flex-col md:min-h-screen md:fixed md:left-0 md:top-0 md:bottom-0'>

        <div className='p-4 sm:p-6 border-b border-gray-700'>
          <h2 className='text-lg font-medium uppercase tracking-wide'>
            Admin Panel
          </h2>

          <p className='text-xs text-gray-400 mt-1'>
            {user?.name}
          </p>
        </div>

        <nav className='flex-1 p-3 sm:p-4 space-y-1'>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-white text-gray-900 font-medium'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='p-3 sm:p-4 border-t border-gray-700 space-y-1'>
          <Link
            to='/'
            className='block px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md'
          >
            ← Return to Store
          </Link>

          <button
            onClick={logout}
            className='w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-red-400 hover:bg-gray-800 rounded-md'
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 bg-gray-50 p-4 sm:p-6 md:p-8 md:ml-64'>
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout