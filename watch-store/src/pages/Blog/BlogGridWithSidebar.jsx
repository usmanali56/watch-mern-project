import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import post1 from '../../assets/post-image1.jpg'
import post2 from '../../assets/post-small-image2.jpg'
import post3 from '../../assets/post-small-image3.jpg'

import img1 from '../../assets/post-image1.jpg'
import img2 from '../../assets/post-image2.jpg'
import img3 from '../../assets/post-image3.jpg'
import img4 from '../../assets/post-image4.jpg'
import img5 from '../../assets/post-image5.jpg'
import img6 from '../../assets/post-image6.jpg'
import img7 from '../../assets/post-image7.jpg'
import img8 from '../../assets/post-image8.jpg'
import img9 from '../../assets/post-image9.jpg'
const BlogGridWithSidebar = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const posts = [
    { id: 1, category: 'FASHION', date: '12 JAN, 2022', title: 'How To Look Outstanding In Pastel', excerpt: 'Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla...', image: img1 },
    { id: 2, category: 'FASHION', date: '18 JAN, 2022', title: 'Top 10 Fashion Trend For Summer', excerpt: 'vel pretium suspendisse ultrices tempus vestibulum, nisl platea adipiscing ac ullamcorper...', image:img2 },
    { id: 3, category: 'FASHION', date: '10 FEB, 2022', title: 'Crazy Fashion With Unique Moment', excerpt: 'Consequat suspendisse ultrices tempus vestibulum, nisl platea adipiscing ac ullamcorper...', image:img3},
    { id: 4, category: 'FASHION', date: '05 MARCH, 2022', title: 'Soft Cotton Onepiece Dress For Women', excerpt: 'Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla...', image:img4 },
    { id: 5, category: 'FASHION', date: '28 MARCH, 2022', title: 'Best Accessories For 2022', excerpt: 'vel pretium suspendisse ultrices tempus vestibulum, nisl platea adipiscing ac ullamcorper...', image: img5 },
    { id: 6, category: 'FASHION', date: '04 APRIL, 2022', title: 'Top 20 Trending Photography Poses', excerpt: 'Consequat suspendisse ultrices tempus vestibulum, nisl platea adipiscing ac ullamcorper...', image:img6 },
    { id: 7, category: 'FASHION', date: '07 APRIL, 2022', title: 'Top 10 Minimal Outlooks For Womens', excerpt: 'Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla...', image:img7 },
    { id: 8, category: 'FASHION', date: '10 APRIL, 2022', title: 'Fashion Clothing For Summer', excerpt: 'vel pretium suspendisse ultrices tempus vestibulum, nisl platea adipiscing ac ullamcorper...', image: img8 },
    { id: 9, category: 'FASHION', date: '10 APRIL, 2022', title: 'Best Accessories For 2022', excerpt: 'vel pretium suspendisse ultrices tempus vestibulum, nisl platea adipiscing ac ullamcorper...', image: img9 },
  ]

  const categories = ['All', 'Women', 'Accessories', 'Fashion', 'Dressup', 'Makeup', 'Photography']
  const tags = ['Beauty', 'Fashion', 'Travel', 'Denim', 'Trending', 'Clothing', 'Photography', 'Jackets']
  const recentPosts = [
    { id: 1, date: 'JUL 11, 2022', title: 'How To Look Outstanding In Pastel', image: post1 },
    { id: 2, date: 'JUL 18, 2022', title: 'Top 10 Minimal Outlooks For Womens', image: post2 },
    { id: 3, date: 'AUG 21, 2022', title: 'Soft Cotton Onepiece Dress For Women', image:post3 },
  ]
  const socialLinks = ['Facebook', 'Twitter', 'Pinterest', 'Youtube']
  const totalPages = 5

  return (
    <div className='px-4 md:px-10 py-10 mt-10'>
      <div className='flex flex-col lg:flex-row gap-10'>

        {/* Main blog grid - 2/3 width */}
        <div className='w-full lg:w-2/3'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10'>
            {posts.map((post) => (
              <div key={post.id}>
                <Link to={`/blog/${post.id}`}>
                  <div className='bg-gray-100 aspect-[4/3] overflow-hidden'>
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-300 text-sm'>
                        No Image
                      </div>
                    )}
                  </div>
                </Link>

                <p className='text-xs text-gray-500 uppercase mt-4'>
                  {post.category} / {post.date}
                </p>

                <h3 className='uppercase text-lg font-semibold mt-2 leading-snug'>
                  <Link to={`/blog/${post.id}`} className='hover:text-gray-600 transition'>
                    {post.title}
                  </Link>
                </h3>

                <p className='text-sm text-gray-500 mt-3 leading-relaxed'>
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className='w-full lg:w-1/3 space-y-10'>

          {/* Search */}
          <div>
            <input
              type='text'
              placeholder='Search'
              className='w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-black'
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className='uppercase text-lg font-semibold border-b border-gray-200 pb-3 mb-4'>
              Categories
            </h3>
            <ul className='flex flex-wrap gap-x-5 gap-y-2'>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to='' className='text-sm text-gray-700 hover:text-black transition'>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className='uppercase text-lg font-semibold border-b border-gray-200 pb-3 mb-4'>
              Tags
            </h3>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to=''
                  className='border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition'
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className='uppercase text-lg font-semibold border-b border-gray-200 pb-3 mb-4'>
              Recent Posts
            </h3>
            <div className='space-y-4'>
              {recentPosts.map((post) => (
                <div key={post.id} className='flex gap-3'>
                  <div className='w-16 h-16 bg-gray-100 flex-shrink-0 overflow-hidden'>
                    {post.image ? (
                      <img src={post.image} alt={post.title} className='w-full h-full object-cover' />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-300 text-[10px]'>
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>{post.date}</p>
                    <Link
                      to={`/blog/${post.id}`}
                      className='text-sm font-semibold uppercase leading-snug hover:text-gray-600 transition block mt-1'
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className='uppercase text-lg font-semibold border-b border-gray-200 pb-3 mb-4'>
              Follow Us:
            </h3>
            <ul className='flex flex-wrap gap-x-5 gap-y-2'>
              {socialLinks.map((social) => (
                <li key={social}>
                  <Link to='' className='text-sm text-gray-700 hover:text-black transition'>
                    {social}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pagination - centered on the full page */}
      <div className='flex justify-center items-center gap-2 mt-14'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 flex items-center justify-center text-sm ${
              page === currentPage
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BlogGridWithSidebar