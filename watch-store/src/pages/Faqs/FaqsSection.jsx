import React, { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const faqs = [
  {
    question: 'HOW TO ORDER PRODUCTS?',
    answer:
      'Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.'
  },
  {
    question: 'SHOULD BUY ONLINE COMPULSORY?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: 'CAN I GET DISCOUNTS IN PRODUCTS?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: 'WHAT INFORMATIONS SHOULD I NEED TO PROVIDE WHEN ORDERING?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: 'CAN I CANCEL MY ORDER?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: "WHAT'S YOUR RETURN POLICY",
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: "I HAVEN'T RECEIVED MY ORDER",
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: 'HOW IS SHIPPING CHARGE DETERMINED?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: 'WHERE IS YOUR SHOP LOCATED?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
]

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' }

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const [formData, setFormData] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // Yehi wahi backend endpoint hai jo Contact page use karta hai
      await API.post('/contact', formData)
      toast.success('We have received your message. We will contact you soon.')
      setFormData(emptyForm)
    } catch (error) {
      toast.error(error.response?.data?.message || 'There was a problem sending the message.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='w-full py-16 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14'>

        {/* Left: FAQ */}
        <div>
          <h2 className='text-3xl md:text-4xl font-normal text-gray-900 mb-4'>
            Frequently asked questions
          </h2>
          <p className='text-gray-400 mb-8 leading-relaxed'>
            Malesuada nunc vel risus commodo viverra. Viverra accumsan in nisl nisi.
            Pretium nibh ipsum consequat nisl vel pretium. Tortor dignissim
            convallis aenean et tortor at risus viverra adipiscing.
          </p>

          <div className='divide-y divide-gray-200'>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index} className='py-5'>
                  <button
                    onClick={() => toggleFaq(index)}
                    className='w-full flex items-center justify-between text-left'
                  >
                    <span className='font-semibold text-gray-900 uppercase text-sm md:text-base pr-4'>
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <FaChevronUp className='text-gray-500 flex-shrink-0' size={14} />
                    ) : (
                      <FaChevronDown className='text-gray-500 flex-shrink-0' size={14} />
                    )}
                  </button>

                  {isOpen && (
                    <p className='text-gray-400 leading-relaxed mt-4'>
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Ask us anything form */}
        <div>
          <h2 className='text-3xl md:text-4xl font-normal text-gray-900 mb-4'>
            Ask us anything
          </h2>
          <p className='text-gray-400 mb-8 leading-relaxed'>
            Call Us +123 987 456 or just drop us your message at{' '}
            <span className='text-gray-900 font-medium'>contact@yourcompany.com</span>.
            You can directly message us.
          </p>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Write Your Name Here'
                required
                className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
              />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Write Your Email Here'
                required
                className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
              />
            </div>

            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Phone Number'
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />

            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              placeholder='Write Your Subject Here'
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />

            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              placeholder='Write Your Message Here'
              rows={6}
              required
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-y'
            />

            <button
              type='submit'
              disabled={submitting}
              className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wide py-4 rounded-md transition-colors disabled:opacity-50'
            >
              {submitting ? 'SENDING...' : 'SUBMIT'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default FaqSection