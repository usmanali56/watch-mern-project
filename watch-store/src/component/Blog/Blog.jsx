import React from "react";
import img1 from '../../assets/post-image1.jpg'
import img2 from '../../assets/post-image2.jpg'
import img3 from '../../assets/post-image3.jpg'
import { Link } from "react-router-dom";
const blogPosts = [
  {
    category: "FASHION",
    date: "JUL 11, 2022",
    title: "HOW TO LOOK OUTSTANDING IN PASTEL",
    excerpt:
      "Dignissim lacus,turpis ut suspendisse vel tellus.Turpis purus,gravida orci,fringilla...",
    image:img1, 
  },
  {
    category: "FASHION",
    date: "JUL 11, 2022",
    title: "TOP 10 FASHION TREND FOR SUMMER",
    excerpt:
      "Turpis purus, gravida orci, fringilla dignissim lacus, turpis ut suspendisse vel tellus...",
    image:img2,
  },
  {
    category: "FASHION",
    date: "JUL 11, 2022",
    title: "CRAZY FASHION WITH UNIQUE MOMENT",
    excerpt:
      "Turpis purus, gravida orci, fringilla dignissim lacus, turpis ut suspendisse vel tellus...",
    image:img3, 
  },
];

export default function Blog() {
  return (
    <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h4 data-aos="fade-right" className="text-3xl font-normal tracking-wide">
          READ BLOG POSTS
        </h4>
        
         <Link data-aos="fade-left" to="#"
          className="text-sm font-medium underline underline-offset-4 hover:text-gray-600"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Blog Grid */}
      <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="group cursor-pointer">
            {/* Image */}
            <div data-aos="fade-up" className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Category / Date */}
            <p className="mt-4 text-xs tracking-wide text-gray-500 uppercase">
              {post.category} / {post.date}
            </p>

            {/* Title */}
            <h5 className="mt-2 text-xl text-[#111111] font-normal leading-snug ">
              {post.title}
            </h5>

            {/* Excerpt */}
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}