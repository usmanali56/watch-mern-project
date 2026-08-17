import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

const statusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'bg-green-100 text-green-700'
    case 'Shipped': return 'bg-blue-100 text-blue-700'
    case 'Cancelled': return 'bg-red-100 text-red-700'
    case 'Processing': return 'bg-yellow-100 text-yellow-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const Track = () => {
  const { isLoggedIn } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoggedIn) {
      fetchMyOrders()
    } else {
      setLoading(false)
    }
  }, [isLoggedIn])

  const fetchMyOrders = async () => {
    setLoading(true)
    try {
      const { data } = await API.get('/orders/my-orders')
      setOrders(data)
    } catch (error) {
      console.error('Orders fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Agar user login hi nahi hai to login karne ka message dikhayen
  if (!isLoggedIn) {
    return (
      <div className='w-full max-w-2xl mx-auto py-16 px-6 text-center'>
        <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-6 uppercase'>
          My Orders
        </h1>
        <p className='text-gray-400 mb-8'>
         Please login first to view your orders.
        </p>
        <Link
          to='/loginpage'
          className='inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide px-8 py-3 rounded-md transition-colors'
        >
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full max-w-3xl mx-auto py-16 px-6'>
      <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-2 uppercase'>
        My Orders
      </h1>
      <p className='text-gray-400 mb-10 leading-relaxed'>
       All your orders will be displayed here along with their current status.
      </p>

      {loading ? (
        <p className='text-gray-400'>Loading...</p>
      ) : orders.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-gray-400 mb-6'>You haven't placed any orders yet.</p>
          <Link
            to='/shop'
            className='inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide px-8 py-3 rounded-md transition-colors'
          >
           Start Shopping
          </Link>
        </div>
      ) : (
        <div className='space-y-4'>
          {orders.map((order) => (
            <div key={order._id} className='border border-gray-200 rounded-md p-5'>
              {/* Order header */}
              <div className='flex flex-wrap justify-between items-center gap-2 mb-4'>
                <div>
                  <p className='text-xs text-gray-400'>Order ID</p>
                  <p className='text-sm font-mono'>{order._id}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

              {/* Items */}
              <div className='border-t border-gray-100 pt-4 space-y-1'>
                {order.items.map((item, i) => (
                  <p key={i} className='text-sm text-gray-600'>
                    {item.product?.name || 'Product'} <span className='text-gray-400'>x{item.quantity}</span>
                  </p>
                ))}
              </div>

              {/* Footer - total + payment */}
              <div className='flex flex-wrap justify-between items-center gap-2 mt-4 pt-4 border-t border-gray-100'>
                <p className='text-sm text-gray-500'>
                  {order.paymentMethod} — <span className={order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-gray-500'}>{order.paymentStatus}</span>
                </p>
                <p className='text-base font-medium'>${order.totalAmount?.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Track