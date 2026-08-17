import React from 'react'
import Slider from '../../component/Slider/Slider'
import Services from '../../component/Services/Services'
import CategoryGrid from '../../component/CategoryGrid/CategoryGrid'
import Category from '../../component/Category/Category'
import Reviews from '../../component/Review/Reviews'
import Blog from '../../component/Blog/Blog'
import LogoSection from '../../component/LogoSection/LogoSection'
import Newsletter from '../../component/Newsletter/Newsletter'
import SocialSection from '../../component/SocialSection/SocialSection'

const Home = () => {
  return (
    <div>
      <Slider />
      <Services />
      <CategoryGrid />
      <Category />
      <Reviews />
      <Blog />
      <LogoSection />
      <Newsletter />
      <SocialSection />
    </div>
  )
}

export default Home