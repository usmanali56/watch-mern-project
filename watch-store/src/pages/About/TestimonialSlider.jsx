import React, { useState } from 'react'

const testimonials = [
  {
    quote: '"More than expected crazy soft, flexible and best fitted white simple denim shirt."',
    author: 'CASUAL WAY'
  },
  {
    quote: '"Best fitted white denim shirt more than expected crazy soft, flexible"',
    author: 'UPTOP'
  },
  {
    quote: '"Best fitted white denim shirt more than expected crazy soft, flexible"',
    author: 'UPTOP'
  },
  {
    quote: '"Best fitted white denim shirt more white denim than expected flexible crazy soft."',
    author: 'DENIM CRAZE'
  }
]

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='w-full py-20 px-6 flex flex-col items-center justify-center text-center'>
      <p className='text-sm font-bold tracking-wide text-gray-900 mb-8'>
        WE LOVE GOOD COMPLIMENT
      </p>

      <div className='max-w-2xl'>
        <p className='text-2xl md:text-3xl text-gray-400 leading-relaxed mb-4'>
          {testimonials[activeIndex].quote}
        </p>
        <p className='text-sm text-gray-400 tracking-wide mb-8'>
          {testimonials[activeIndex].author}
        </p>
      </div>

      {/* Dots */}
      <div className='flex items-center gap-2'>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === activeIndex ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialSlider