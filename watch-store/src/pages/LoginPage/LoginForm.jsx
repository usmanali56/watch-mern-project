import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitting(true)
    const success = await login(email, password)
    setSubmitting(false)

    if (success) {
      navigate('/') // Login successful -> Home page pe bhej do
    }
  }

  return (
    <div className='w-full  flex items-center justify-center px-4 mt-10'>
      <div className='w-full max-w-md'>
        <h1 className='text-4xl font-normal tracking-wide text-gray-900 mb-8'>
          LOGIN
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
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

          {/* Password */}
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm text-gray-500 mb-1'>
              Password <span className='text-gray-500'>*</span>
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
              className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />
          </div>

          {/* Remember me */}
          <div className='flex items-center mb-6'>
            <input
              id='rememberMe'
              type='checkbox'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='w-4 h-4 border-gray-300 rounded mr-2'
            />
            <label htmlFor='rememberMe' className='text-sm text-gray-600'>
              Remember me
            </label>
          </div>

          {/* Login button */}
          <button
            type='submit'
            disabled={submitting}
            className='bg-gray-900 text-white text-sm font-medium tracking-wide px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {submitting ? 'LOGGING IN...' : 'LOG IN'}
          </button>

          {/* Signup link + Lost password */}
          <div className='flex flex-col gap-2'>
            <div>
              <span className='text-sm text-gray-600'>Account not found </span>
              <Link to='/signup' className='text-sm text-gray-900 hover:underline'>
                Signup 
              </Link>
            </div>
            <a href='#' className='text-sm text-gray-900 hover:underline'>
              Lost your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm