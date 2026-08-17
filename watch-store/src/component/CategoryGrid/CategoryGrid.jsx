import React from "react";
import img1 from '../../assets/category-banner-3.jpg'
import img2 from '../../assets/category-banner-1.jpg'
import img3 from '../../assets/category-banner-2.jpg'

const categories = [
  {
    title: "FOR MEN",
    image: img1,
  },
  {
    title: "FOR WOMEN",
    image: img2,
  },
  {
    title: "FOR ACCESSORIES",
    image: img3,
  },
];

export default function CategoryGrid() {
  return (
    <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-3 gap-1 max-w-8xl mx-auto mt-20">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="relative group overflow-hidden cursor-pointer h-64 sm:h-96 md:h-[500px] lg:h-150"
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-95"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-end pb-6 text-white">
            <h3 className="text-lg font-semibold tracking-wide">
              {cat.title}
            </h3>
            <button className="text-sm underline mt-1 hover:text-gray-200">
              SHOP IT NOW
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}