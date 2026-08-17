import React, { useState } from 'react'
import logo from '../../assets/main-logo.png'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Asal (real) counts Context se - ab hardcoded (0) nahi hai
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { isLoggedIn, isAdmin, user, logout } = useAuth()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pages', path: '/loginpage' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <div className='sticky top-0 left-0 w-full bg-[#FFFFFF] uppercase text-base p-3 border-b flex items-center z-50'>
      <div className='w-full'>
        <div className='flex justify-between items-center w-full gap-0'>

          {/* logo */}
          <div className='w-auto'>
            <Link to="/">
              <img src={logo} alt="" className='h-8 md:h-10 w-auto' />
            </Link>
          </div>

          {/* desktop links */}
          <div className='hidden lg:flex w-auto'>
            <div className='flex-1 overflow-y-auto p-4'>
              <ul className='flex justify-end flex-grow gap-1 md:gap-6 pe-3'>
                {navLinks.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path} className='text-[#000000CC] hover:text-black transition'>
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* Admin ko sirf Admin Panel ka link dikhega */}
                {isAdmin && (
                  <li>
                    <Link to="/admin" className='text-[#000000CC] hover:text-black transition'>
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* cart / wishlist / hamburger */}
          <div className='w-auto flex items-center gap-3'>

            {/* text version - desktop/tablet */}
            <ul className='hidden sm:flex m-0 items-center'>
              <li>
                <Link to="/wishlist" className='uppercase mx-3 text-[#8F8F8F] text-sm md:text-base'>
                  Wishlist <span>({wishlistCount})</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className='uppercase mx-3 text-[#8F8F8F] text-sm md:text-base'>
                  Cart <span>({cartCount})</span>
                </Link>
              </li>

              {/* Login/Logout - asal auth state ke hisab se */}
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={logout}
                    className='normal-case mx-3 text-[#8F8F8F] text-sm md:text-base'
                  >
                    Logout ({user?.name})
                  </button>
                ) : (
                  <Link to="/loginpage" className='uppercase mx-3 text-[#8F8F8F] text-sm md:text-base'>
                    Login
                  </Link>
                )}
              </li>
            </ul>

            {/* icon version - mobile only, next to hamburger */}
            <div className='flex sm:hidden items-center gap-3'>
              <Link to="/wishlist" className='relative text-[#8F8F8F]'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className='w-5 h-5'>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c-.318 0-.636-.088-.912-.264C7.5 17.66 3 14.06 3 9.75 3 6.68 5.42 4.5 8.25 4.5c1.68 0 3.15.84 4.05 2.13.9-1.29 2.37-2.13 4.05-2.13 2.83 0 5.25 2.18 5.25 5.25 0 4.31-4.5 7.91-8.088 10.236-.276.176-.594.264-.912.264z" />
                </svg>
                <span className='absolute -top-1.5 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full'>
                  {wishlistCount}
                </span>
              </Link>

              <Link to="/cart" className='relative text-[#8F8F8F]'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className='w-5 h-5'>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.907-4.706 2.311-7.184a1.125 1.125 0 00-1.11-1.316H5.106M7.5 14.25L5.106 5.272M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className='absolute -top-1.5 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full'>
                  {cartCount}
                </span>
              </Link>
            </div>

            {/* mobile hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* mobile menu dropdown - only nav links now */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className='flex flex-col items-center text-center gap-4 py-4 border-t'>
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className='block text-[#000000CC] hover:text-black transition'
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className='block text-[#000000CC] hover:text-black transition'
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              </li>
            )}

            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className='normal-case block text-[#000000CC] hover:text-black transition'
                >
                  Logout ({user?.name})
                </button>
              ) : (
                <Link
                  to="/loginpage"
                  className='block text-[#000000CC] hover:text-black transition'
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar