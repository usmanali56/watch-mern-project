import React from 'react'
import img1 from '../../assets/insta-item1.jpg'
import img2 from '../../assets/insta-item2.jpg'
import img3 from '../../assets/insta-item3.jpg'
import img4 from '../../assets/insta-item4.jpg'
import img5 from '../../assets/insta-item5.jpg'
import img6 from '../../assets/insta-item6.jpg'

const SocialSection = () => {
  return (
    <div data-aos="fade-up" className='py-5 mt-10'>
      <h6 className='text-center text-base font-normal mb-5'>Follow us on Instagram</h6>

      <div data-aos="fade-up" className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 px-4'>
        <img className='w-full h-40 object-cover' src={img1} alt="" />
        <img className='w-full h-40 object-cover' src={img2} alt="" />
        <img className='w-full h-40 object-cover' src={img3} alt="" />
        <img className='w-full h-40 object-cover' src={img4} alt="" />
        <img className='w-full h-40 object-cover' src={img5} alt="" />
        <img className='w-full h-40 object-cover' src={img6} alt="" />
      </div>
    </div>
  )
}

export default SocialSection