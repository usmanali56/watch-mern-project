import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api/axios'

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [pendingOrders, setPendingOrders] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        API.get('/products'),
        API.get('/orders'),
      ])

      setProductCount(productsRes.data.length)
      setOrderCount(ordersRes.data.length)
      setPendingOrders(
        ordersRes.data.filter((o) => o.orderStatus === 'Pending').length
      )
    } catch (error) {
      console.error('Dashboard stats fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      label: 'Total Products',
      value: productCount,
      link: '/admin/products',
    },
    {
      label: 'Total Orders',
      value: orderCount,
      link: '/admin/orders',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders,
      link: '/admin/orders',
    },
  ]

  return (
    <div className='w-full'>

      {/* Heading */}
      <h1 className='text-xl sm:text-2xl font-medium text-gray-900 mb-5 sm:mb-6'>
        Dashboard
      </h1>

      {/* Stats */}
      {loading ? (
        <p className='text-gray-500 text-sm'>Loading...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6'>
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.link}
              className='bg-white p-5 sm:p-6 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow'
            >
              <p className='text-sm text-gray-500 mb-2'>
                {stat.label}
              </p>

              <p className='text-2xl sm:text-3xl font-medium text-gray-900'>
                {stat.value}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Links */}
      <div className='mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-md shadow-sm border border-gray-100'>

        <h2 className='text-lg font-medium mb-4'>
          Quick Links
        </h2>

        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>

          <Link
            to='/admin/products'
            className='w-full sm:w-auto text-center text-sm bg-gray-900 text-white px-5 sm:px-6 py-2.5 rounded-sm hover:bg-gray-800 transition-colors'
          >
            + Add new product
          </Link>

          <Link
            to='/admin/orders'
            className='w-full sm:w-auto text-center text-sm border border-gray-300 text-gray-700 px-5 sm:px-6 py-2.5 rounded-sm hover:bg-gray-50 transition-colors'
          >
            View Orders
          </Link>

        </div>
      </div>

    </div>
  )
}

export default Dashboard