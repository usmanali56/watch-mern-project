import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  const items = wishlist.items || []

  return (
    <div className='px-4 md:px-10 py-6 mt-10'>
      {/* Breadcrumb */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 sm:gap-0'>
        <h1 className='uppercase text-lg sm:text-xl md:text-2xl'>My Wishlist</h1>
        <nav className='flex justify-between gap-3 sm:gap-5 text-sm sm:text-base'>
          <Link to='/'>Home</Link>
          <span>/</span>
          <span className='text-gray-500'>Wishlist</span>
        </nav>
      </div>

      {/* Khali wishlist ka message */}
      {items.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' className='w-16 h-16 text-gray-300 mb-4'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
          </svg>
          <p className='text-gray-500 mb-6'>Empty wishlist</p>
          <Link
            to='/shop'
            className='bg-gray-900 text-white text-sm font-medium tracking-wide px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors'
          >
           Start Shopping

          </Link>
        </div>
      ) : (
        /* Product grid - Shop page jaisa style */
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
          {items.map((item) => {
            const product = item.product
            if (!product) return null

            return (
              <div key={product._id} className='group relative'>
                {/* Image */}
                <div className='relative overflow-hidden bg-gray-100 aspect-square'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover'
                  />

                  {/* Remove from wishlist button - hamesha visible (heart bhara hua) */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className='absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center'
                    aria-label='Wishlist se hatayen'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4 text-red-500'>
                      <path d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
                    </svg>
                  </button>
                </div>

                {/* Name + price + add to cart */}
                <div className='mt-3'>
                  <h3 className='uppercase text-sm font-medium'>{product.name}</h3>
                  <p className='text-sm text-gray-700 mt-1'>
                    ${product.price?.toLocaleString()}.00
                  </p>
                  <button
                    onClick={() => addToCart(product._id)}
                    className='mt-2 text-sm uppercase text-black hover:underline'
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Wishlist