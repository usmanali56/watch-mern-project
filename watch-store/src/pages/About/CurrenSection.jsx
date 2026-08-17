import React from 'react'
import img from '../../assets/post-image8.jpg'
const CurrenSection = () => {
  return (
    <div className='w-full py-16 px-6'>
          <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16'>
    
            {/* Left content*/}
             <div className='w-full md:w-1/2'>
              <h2 className='text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-6 uppercase'>
               Who are we?
              </h2>
    
              <p className='text-gray-500 text-base leading-relaxed'>
               We are nunc, lorem sit lorem urna, pretium aliquam ut. 
               In vel, quis donec dolor id in.
                Pulvinar commodo mollis diam sed facilisis at magna imperdiet cursus ac faucibus sit libero. 
                Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla a.
                Ac sed eu fringilla odio mi. Consequat pharetra at magna imperdiet cursus ac faucibus sit libero.
              </p>
            </div>
            
            {/* Right image */}
           <div className='w-full md:w-1/2'>
              <img
                src={img}
                alt='The Beginning of Our Journey'
                className='w-full h-auto object-cover rounded-sm'
              />
            </div>
    
    
          </div>
        </div>
  )
}

export default CurrenSection
