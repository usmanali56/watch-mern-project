import React from 'react'
import { Link } from 'react-router-dom'
import SignupForm from './SignupForm'
import Newsletter from '../../component/Newsletter/Newsletter'
import SocialSection from '../../component/SocialSection/SocialSection'

const SignupPage = () => {
  return (
    <>
    <div className='bg-[#f1f1f0] flex items-center justify-center lg:pt-10'>
      <Link to='/'>Home</Link>
      <span className='p-2'>/</span>
      <span className='text-[#8f8f8f]'>Create Account</span>
    </div>
<SignupForm />
<Newsletter />
<SocialSection />
    </>
  )
}

export default SignupPage