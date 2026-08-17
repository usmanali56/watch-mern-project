import React, { useState } from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' }

const ContactSection = () => {
  const [formData, setFormData] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await API.post('/contact', formData)
      toast.success('We have received your message. We will contact you soon.')
      setFormData(emptyForm) // form khali kar dete hain success ke baad
    } catch (error) {
      toast.error(error.response?.data?.message || 'There was a problem sending the message.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='w-full py-16 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14'>

        {/* Left: Contact Information */}
        <div>
          <h2 className='text-2xl md:text-3xl font-medium text-gray-900 uppercase mb-4'>
            Contact Information
          </h2>
          <p className='text-gray-400 mb-8'>
            Tortor dignissim convallis aenean et tortor at risus viverra adipiscing.
          </p>

          {/* Head Office */}
          <h3 className='text-lg font-semibold text-gray-900 uppercase mb-2'>
            Head Office
          </h3>
          <p className='text-gray-400 mb-3'>730 Glenstone Ave 65802, Springfield, US</p>
          <p className='text-gray-900 mb-3'>+123 987 321 +123 123 654</p>
          <p className='text-gray-900 mb-6'>Elegant@templatesjungle.com</p>

          {/* Branch Office */}
          <h3 className='text-lg font-semibold text-gray-900 uppercase mb-2'>
            Branch Office
          </h3>
          <p className='text-gray-400 mb-3'>730 Glenstone Ave 65802, Springfield, US</p>
          <p className='text-gray-900 mb-3'>+123 987 321 +123 123 654</p>
          <p className='text-gray-900 mb-6'>contact@yourcompany.com</p>

          {/* Social Info */}
          <h3 className='text-lg font-semibold text-gray-900 uppercase mb-3'>
            Social Info
          </h3>
          <div className='flex items-center gap-3'>
            <a href='#' className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100'>
              <FaFacebookF size={14} />
            </a>
            <a href='#' className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100'>
              <FaTwitter size={14} />
            </a>
            <a href='#' className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100'>
              <FaYoutube size={14} />
            </a>
            <a href='#' className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100'>
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <h2 className='text-2xl md:text-3xl font-medium text-gray-900 uppercase mb-4'>
            Got Any Questions?
          </h2>
          <p className='text-gray-400 mb-8'>
            Use the form below to get in touch with us.
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

export default ContactSection