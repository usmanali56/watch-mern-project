import React from 'react'
import logo1 from '../../assets/logo1.png'
import logo2 from '../../assets/logo2.png'
import logo3 from '../../assets/logo3.png'
import logo4 from '../../assets/logo4.png'
import logo5 from '../../assets/logo5.png'

const LogoSection = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5]

  return (
    <div data-aos="fade-right" className='grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-around items-center gap-6 sm:gap-8 md:gap-4 mt-12 md:mt-20 px-6 md:px-0 max-w-7xl mx-auto'>
      {logos.map((logo, i) => (
        <div key={i} className='flex justify-center items-center'>
          <img
            src={logo}
            alt=""
            className='h-8 sm:h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300'
          />
        </div>
      ))}
    </div>
  )
}

export default LogoSection