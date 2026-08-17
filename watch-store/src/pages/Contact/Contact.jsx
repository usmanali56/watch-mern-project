import React from 'react'
import { Link } from 'react-router-dom'
import ContactSection from './ContactSection'
import OfficeLocations from './OfficeLocations'
import Newsletter from '../../component/Newsletter/Newsletter'
import SocialSection from '../../component/SocialSection/SocialSection'

const link = [
  {
    label: "Home",
    path: '/'
  },
  {
    label: "Pages",
    path: '/loginpage'
  },
  {
    label: "Checkout",
  },
]

const Contact = () => {
  return (
    <>
      <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-16 py-8 gap-3'>
        <h1 className='text-4xl md:text-5xl font-light text-gray-900'>
          Checkout
        </h1>
        <div className='flex items-center gap-2 text-sm text-gray-400'>
          {link.map((item, index) => {
            const isLast = index === link.length - 1
            return (
              <React.Fragment key={index}>
                {isLast ? (
                  <span className='text-gray-900'>{item.label}</span>
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

      <ContactSection />
      <OfficeLocations />
      <Newsletter />
      <SocialSection />
    </>
  )
}

export default Contact