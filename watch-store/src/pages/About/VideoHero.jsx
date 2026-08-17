import React from 'react'
import bg from '../../assets/post-image8.jpg'
const VideoHero = () => {


  return (
    <div
      className='relative w-full h-[300px] md:h-[620px] bg-cover bg-center flex items-center justify-center overflow-hidden'
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Keyframes yahin define kar diye, tailwind.config change karne ki zaroorat nahi */}
      <style>{`
        @keyframes rotateText {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotating-text {
          animation: rotateText 10s linear infinite;
        }
      `}</style>

      {/* Optional dark overlay */}
      <div className='absolute inset-0 bg-black/10' />

      {/* Rotating text + fixed play button */}
      <div className='relative z-10 w-40 h-40 flex items-center justify-center'>
        {/* Rotating text ring */}
        <svg
          viewBox='0 0 200 200'
          className='absolute w-full h-full rotating-text'
        >
          <defs>
            <path
              id='circlePath'
              d='M 100, 100
                 m -75, 0
                 a 75,75 0 1,1 150,0
                 a 75,75 0 1,1 -150,0'
            />
          </defs>
          <text fill='white' fontSize='13' letterSpacing='2'>
            <textPath href='#circlePath' startOffset='0%'>
              CLASSIC COLLECTION 2022 • CLASSIC COLLECTION 2022 •
            </textPath>
          </text>
        </svg>

        {/* Play button - ye rotate nahi hoga, hamesha center mein fix rahega */}
        <button
          type='button'
          aria-label='Play video'
          className='relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors'
        >
          <svg
            viewBox='0 0 24 24'
            className='w-5 h-5 text-gray-900 ml-1'
            fill='currentColor'
          >
            <path d='M8 5v14l11-7z' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VideoHero