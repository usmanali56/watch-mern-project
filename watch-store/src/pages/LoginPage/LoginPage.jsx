import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Newsletter from '../../component/Newsletter/Newsletter'
import SocialSection from '../../component/SocialSection/SocialSection'

const LoginPage = () => {
  return (
    <>
    <div className='bg-[#f1f1f0] flex items-center justify-center lg:pt-10'>
      <Link to='/'>Home</Link>
      <span className='p-2'>/</span>
      <span className='text-[#8f8f8f]'>My Account</span>
    </div>
<LoginForm />
<Newsletter />
<SocialSection />
    </>
  )
}

export default LoginPage
