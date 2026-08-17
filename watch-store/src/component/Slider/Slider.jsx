import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from '../../assets/two-col-banner-1.png'
import img2 from '../../assets/two-col-banner-2.png'
import img3 from '../../assets/two-col-banner-3.png'

const slides = [
  {
    image: img1,
    heading: "TIMELESS ELEGANCE, CRAFTED FOR PERFECTION",
    subtext:
      "Discover the world's finest luxury timepieces, where precision meets artistry.",
    button: "EXPLORE THE COLLECTION",
  },
  {
    image: img2,
    heading: "PRECISION ENGINEERED, BUILT TO LAST",
    subtext:
      "Every detail matters — explore watches made for those who value craftsmanship.",
    button: "SHOP NOW",
  },
  {
    image: img3,
    heading: "A LEGACY WORN ON YOUR WRIST",
    subtext: "Timeless designs that carry heritage into every moment.",
    button: "VIEW COLLECTION",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");
  const [animating, setAnimating] = useState(false);

  const goTo = (index, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 700);
  };

  const prevSlide = () => {
    const index = current === 0 ? slides.length - 1 : current - 1;
    goTo(index, "prev");
  };

  const nextSlide = () => {
    const index = current === slides.length - 1 ? 0 : current + 1;
    goTo(index, "next");
  };

  const slide = slides[current];

  const exitClass =
    direction === "next"
      ? "opacity-0 -translate-x-10"
      : "opacity-0 translate-x-10";

  const enterClass = "opacity-100 translate-x-0";

  return (
    <div data-aos="fade-up" className="relative w-full bg-neutral-200 overflow-hidden pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-16 py-8 md:py-16">
        <div
          key={current}
          className={`w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 transition-all duration-300 ease-in-out ${
            animating ? exitClass : enterClass
          }`}
        >
          {/* Left: Image */}
          <div data-aos="fade-right" className="flex-1 flex justify-center items-center order-1 md:order-none">
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-40 xs:w-52 sm:w-64 md:w-80 lg:w-[420px] h-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Right: Text content */}
          <div data-aos="fade-left" className="flex-1 flex flex-col items-center text-center px-2 sm:px-4 md:px-10">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {slide.heading}
            </h1>
            <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-neutral-600 max-w-xs sm:max-w-sm md:max-w-md">
              {slide.subtext}
            </p>
            <button className="mt-4 md:mt-6 px-4 md:px-6 py-2.5 md:py-3 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-300">
              {slide.button}
            </button>
          </div>
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/70 hover:bg-white shadow-md transition-colors z-10"
      >
        <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-800" />
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/70 hover:bg-white shadow-md transition-colors z-10"
      >
        <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-800" />
      </button>
    </div>
  );
}