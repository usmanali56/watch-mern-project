import React from 'react'
import { Link } from 'react-router-dom'
import Track from './Tack'
import Newsletter from '../../component/Newsletter/Newsletter'
import SocialSection from '../../component/SocialSection/SocialSection'
 const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Pages', path: '/pages' },
    { label: 'Track your Order' }
  ]
const OrderTracking = () => {
  return (
    <>
    <div
      className='relative w-full h-[300px] md:h-[450px] flex flex-col items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: `url(https://demo.templatesjungle.com/elegant/images/banner-large-image1.jpg)` }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/50' />

      {/* Content */}
      <div className='relative z-10 text-center px-4'>
        <h1 className='text-white text-5xl md:text-6xl font-light tracking-wide uppercase mb-4'>
         Track your Order
        </h1>

        <div className='flex items-center justify-center gap-2 text-white/90 text-sm'>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <React.Fragment key={index}>
                {isLast ? (
                  <span className='text-white'>{item.label}</span>
                ) : (
                  <>
                    <Link to={item.path} className='hover:underline'>
                      {item.label}
                    </Link>
                    <span>/</span>
                  </>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
    <Track />
    <Newsletter />
    <SocialSection />
    </>
  )
}

export default OrderTracking
