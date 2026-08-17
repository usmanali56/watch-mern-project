import React from 'react'

const offices = [
  {
    title: 'USA',
    address: '730 Glenstone Ave 65802, Springfield, US',
    phone: '+123 987 321 +123 123 654',
    email: 'Elegant@templatesjungle.com'
  },
  {
    title: 'FRANCE',
    address: '13 Rue Montmartre 75001, Paris, France',
    phone: '+123 987 321 +123 123 654',
    email: 'Elegant@templatesjungle.com'
  },
  {
    title: 'OFFICE',
    address: '18 Chapel Brow PR25 3NE, Leyland, UK',
    phone: '+123 987 321 +123 123 654',
    email: 'Elegant@templatesjungle.com'
  }
]

const OfficeLocations = () => {
  return (
    <div className='w-full py-14 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10'>
        {offices.map((office, index) => (
          <div key={index}>
            <h3 className='text-2xl font-medium text-gray-900 mb-3'>
              {office.title}
            </h3>
            <p className='text-gray-400 mb-3'>{office.address}</p>
            <p className='text-gray-900 mb-3'>{office.phone}</p>
            <p className='text-gray-900'>{office.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OfficeLocations