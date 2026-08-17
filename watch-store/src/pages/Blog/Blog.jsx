import React from 'react'
import { Link } from 'react-router-dom'

import img from '../../assets/post-image1.jpg'
import BlogGridWithSidebar from './BlogGridWithSidebar'
import Newsletter from '../../component/Newsletter/Newsletter'
import SocialSection from '../../component/SocialSection/SocialSection'
const Blog = ({ title = 'Blog Grid With Sidebar' }) => {
  return (
    <>
    <div
      className='relative w-full h-[250px] sm:h-[350px] md:h-[450px] bg-cover bg-center flex flex-col items-center justify-center'
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Dark overlay for text readability */}
      <div className='absolute inset-0 bg-black/30'></div>

      {/* Content on top of the overlay */}
      <div className='relative z-10 text-center px-4'>
        <h1 className='uppercase text-white text-3xl sm:text-4xl md:text-6xl font-medium tracking-wide'>
          {title}
        </h1>

        <nav className='flex justify-center items-center gap-2 sm:gap-3 mt-4 text-white text-sm sm:text-base'>
          <Link to="/" className='hover:underline'>Home</Link>
          <span>/</span>
          <Link to="/loginpage" className='hover:underline'>Pages</Link>
          <span>/</span>
          <span>Shop</span>
        </nav>
      </div>
    </div>
    <BlogGridWithSidebar />
    <Newsletter />
    <SocialSection />
    </>
  )
}

export default Blog