import React, { useState, useEffect } from 'react'
import API from '../../api/axios'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const ITEMS_PER_PAGE = 18

const Category1 = () => {
  const [sortOpen, setSortOpen] = useState(false)
  const [sortOption, setSortOption] = useState('Default Sorting')
  const [currentPage, setCurrentPage] = useState(1)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Cart aur Wishlist ka asal data Context se
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const sortOptions = ['Default Sorting', 'Price: Low to High', 'Price: High to Low']

  // Component load hote hi backend se products mangwa lete hain
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data } = await API.get('/products')
      setProducts(data)
    } catch (error) {
      console.error('Products fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sort logic - asal price ke hisab se (ab ye real numbers hain, isliye kaam karta hai)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'Price: Low to High') return a.price - b.price
    if (sortOption === 'Price: High to Low') return b.price - a.price
    return 0 // Default Sorting - jaisa backend se aaya waisa hi
  })

  // Pagination - frontend par hi hoti hai (backend poore products bhejta hai)
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className='px-4 md:px-10 py-6 mt-10'>

      {/* Top bar: results count + sort dropdown */}
      <div className='flex justify-between items-center mb-6 relative'>
        <p className='text-sm text-gray-500'>
          Showing {paginatedProducts.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results
        </p>

        <div className='relative'>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className='border border-gray-300 rounded px-4 py-2 text-sm flex items-center gap-2 min-w-[140px] justify-between'
          >
            {sortOption}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className='w-4 h-4'>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {sortOpen && (
            <ul className='absolute right-0 mt-1 w-full bg-white border border-gray-200 shadow-md rounded z-10 overflow-hidden'>
              {sortOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSortOption(option)
                    setSortOpen(false)
                    setCurrentPage(1) // sort change hone par pehle page par wapis
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer whitespace-nowrap ${
                    option === sortOption
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Loading / Empty states */}
      {loading ? (
        <p className='text-center text-gray-400 py-20'>Products loading...</p>
      ) : products.length === 0 ? (
        <p className='text-center text-gray-400 py-20'>No products have been added yet.</p>
      ) : (
        <>
          {/* Product grid - 6 per row */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
            {paginatedProducts.map((product) => (
              <div key={product._id} className='group relative'>

                {/* Image + hover overlay */}
                <div className='relative overflow-hidden bg-gray-100 aspect-square'>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-300 text-sm'>
                      No Image
                    </div>
                  )}

                  {/* Wishlist icon - top right, shows on hover */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className='absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    aria-label='Add to wishlist'
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={isInWishlist(product._id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={`w-4 h-4 ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-700'}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>

                {/* Name + price / add to cart */}
                <div className='mt-3'>
                  <h3 className='uppercase text-sm font-medium'>{product.name}</h3>

                  <div className='mt-1'>
                    <p className='text-sm text-gray-700 group-hover:hidden'>
                      ${product.price?.toLocaleString()}.00
                    </p>
                    <button
                      onClick={() => addToCart(product._id)}
                      className='hidden group-hover:block text-sm uppercase text-black hover:underline'
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 mt-10'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center text-sm ${
                    page === currentPage
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Category1