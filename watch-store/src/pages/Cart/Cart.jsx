import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const items = cart.items || []

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  )

  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 mt-6 sm:mt-10'>

      {/* Breadcrumb */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3'>

        <h1 className='uppercase text-lg sm:text-xl md:text-2xl'>
          Shopping Cart
        </h1>

        <nav className='flex items-center gap-3 sm:gap-5 text-sm sm:text-base'>
          <Link
            to='/'
            className='hover:text-gray-600 transition-colors'
          >
            Home
          </Link>

          <span>/</span>

          <span className='text-gray-500'>
            Cart
          </span>
        </nav>

      </div>

      {items.length === 0 ? (

        /* Empty Cart */
        <div className='flex flex-col items-center justify-center py-16 sm:py-20 text-center'>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            className='w-14 h-14 sm:w-16 sm:h-16 text-gray-300 mb-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
            />
          </svg>

          <p className='text-gray-500 mb-5 sm:mb-6'>
            Empty cart
          </p>

          <Link
            to='/shop'
            className='w-full sm:w-auto bg-gray-900 text-white text-sm font-medium tracking-wide px-7 sm:px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors text-center'
          >
            Start Shopping
          </Link>

        </div>

      ) : (

        <>
          {/* Cart Items */}
          <div className='overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0'>
            <table className='w-full min-w-[650px] text-left'>

              <thead>
                <tr className='border-b border-gray-200 text-xs uppercase text-gray-500'>

                  <th className='py-3 pr-3 sm:pr-4 whitespace-nowrap'>
                    Product
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Price
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Quantity
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Subtotal
                  </th>

                  <th className='py-3 pl-3 sm:pl-4'>
                  </th>

                </tr>
              </thead>

              <tbody>
                {items.map((item) => {
                  const product = item.product

                  if (!product) return null

                  return (
                    <tr
                      key={product._id}
                      className='border-b border-gray-100'
                    >

                      {/* Product */}
                      <td className='py-4 pr-3 sm:pr-4'>

                        <div className='flex items-center gap-3 sm:gap-4'>

                          <img
                            src={product.image}
                            alt={product.name}
                            className='w-14 h-14 sm:w-16 sm:h-16 object-cover bg-gray-100 flex-shrink-0'
                          />

                          <span className='text-xs sm:text-sm font-medium uppercase max-w-[150px] sm:max-w-[220px]'>
                            {product.name}
                          </span>

                        </div>

                      </td>

                      {/* Price */}
                      <td className='py-4 px-3 sm:px-4 text-sm text-gray-700 whitespace-nowrap'>
                        ${product.price?.toLocaleString()}
                      </td>

                      {/* Quantity */}
                      <td className='py-4 px-3 sm:px-4'>

                        <div className='flex items-center border border-gray-200 w-fit'>

                          <button
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className='w-7 h-8 sm:w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100'
                          >
                            −
                          </button>

                          <span className='w-9 sm:w-10 text-center text-sm'>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                item.quantity + 1
                              )
                            }
                            className='w-7 h-8 sm:w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100'
                          >
                            +
                          </button>

                        </div>

                      </td>

                      {/* Subtotal */}
                      <td className='py-4 px-3 sm:px-4 text-sm font-medium whitespace-nowrap'>
                        ${(product.price * item.quantity).toLocaleString()}
                      </td>

                      {/* Remove */}
                      <td className='py-4 pl-3 sm:pl-4'>

                        <button
                          onClick={() =>
                            removeFromCart(product._id)
                          }
                          className='text-gray-400 hover:text-red-500 transition-colors'
                          aria-label='Item hatayen'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>

                      </td>

                    </tr>
                  )
                })}
              </tbody>

            </table>
          </div>

          {/* Total + Checkout */}
          <div className='mt-6 sm:mt-8 flex justify-end'>

            <div className='w-full sm:w-80 bg-gray-50 p-4 sm:p-6'>

              <div className='flex justify-between text-sm sm:text-base font-medium mb-4'>
                <span>Total</span>
                <span>
                  ${totalAmount.toLocaleString()}
                </span>
              </div>

              <Link
                to='/checkout'
                className='block text-center w-full bg-gray-900 text-white text-sm font-medium tracking-wide px-6 sm:px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors'
              >
                Proceed to Checkout
              </Link>

            </div>

          </div>
        </>
      )}
    </div>
  )
}

export default Cart