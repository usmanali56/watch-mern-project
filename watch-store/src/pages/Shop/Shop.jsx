import React from 'react'
import { Link } from 'react-router-dom'
import Category from './Category1'
import Category1 from './Category1'
import Newsletter from '../../component/Newsletter/Newsletter'

const Shop = () => {
  return (
    <>
    <div className='flex flex-col sm:flex-row justify-between items-center mt-10 gap-2 sm:gap-0'>
  <h1 className='uppercase text-lg sm:text-xl md:text-2xl p-3 sm:p-5'>
    Shop Six Columns Wide
  </h1>
  <nav className='flex justify-between gap-3 sm:gap-5 p-3 sm:p-5 text-sm sm:text-base'>
    <Link to="/">Home</Link>
    <span>/</span>
    <Link to="/loginpage">Pages</Link>
    <span>/</span>
    <span>Shop</span>
  </nav>
</div>
<Category1 />
<Newsletter />
    </>
  )
}

export default Shop
