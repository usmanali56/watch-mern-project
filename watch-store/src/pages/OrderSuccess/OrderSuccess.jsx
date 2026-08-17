import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const OrderSuccess = () => {
  const location = useLocation()
  const orderId = location.state?.orderId

  return (
    <div className='px-4 py-20 flex flex-col items-center justify-center text-center min-h-[60vh]'>
      {/* Success icon */}
      <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-8 h-8 text-green-600'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
        </svg>
      </div>

      <h1 className='text-2xl font-medium text-gray-900 mb-2'>Order placed successfully!</h1>
      <p className='text-gray-500 mb-1'>Thank you! Your order has been successfully received.</p>

      {orderId && (
        <p className='text-sm text-gray-400 mb-8'>
          Order ID: <span className='font-mono'>{orderId}</span>
        </p>
      )}

      <div className='flex gap-4 mt-4'>
        <Link
          to='/'
          className='border border-gray-900 text-gray-900 text-sm font-medium tracking-wide px-8 py-3 rounded-sm hover:bg-gray-100 transition-colors'
        >
          Back to Home

        </Link>
        <Link
          to='/shop'
          className='bg-gray-900 text-white text-sm font-medium tracking-wide px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors'
        >
         Continue Shopping

        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess