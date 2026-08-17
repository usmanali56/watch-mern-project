import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const SignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match.')
      return
    }

    if (!agree) {
      alert('You must accept the terms and conditions to proceed.')
      return
    }

    setSubmitting(true)
    const success = await signup(name, email, password)
    setSubmitting(false)

    if (success) {
      navigate('/')
    }
  }

  return (
    <div className='w-full flex items-center justify-center px-4 mt-10'>
      <div className='w-full max-w-md'>
        <h1 className='text-4xl font-normal tracking-wide text-gray-900 mb-8'>
          CREATE ACCOUNT
        </h1>

        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label htmlFor='name' className='block text-sm text-gray-500 mb-1'>
              Full name <span className='text-gray-500'>*</span>
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Write your full name here'
              required
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm text-gray-500 mb-1'>
              Email address <span className='text-gray-500'>*</span>
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Write your email address here'
              required
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='password' className='block text-sm text-gray-500 mb-1'>
              Password <span className='text-gray-500'>*</span>
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Kam se kam 6 characters'
              minLength={6}
              required
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-sm text-gray-500 mb-1'>
              Confirm password <span className='text-gray-500'>*</span>
            </label>
            <input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Password dobara likhen'
              required
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />
          </div>

          <div className='flex items-center mb-6'>
            <input
              id='agree'
              type='checkbox'
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className='w-4 h-4 border-gray-300 rounded mr-2'
            />
            <label htmlFor='agree' className='text-sm text-gray-600'>
             I agree to the terms and conditions.
            </label>
          </div>

          <button
            type='submit'
            disabled={submitting}
            className='bg-gray-900 text-white text-sm font-medium tracking-wide px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {submitting ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>

          <div>
            <span className='text-sm text-gray-600'>Do you already have an account?</span>
            <Link to='/loginpage' className='text-sm text-gray-900 hover:underline'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm