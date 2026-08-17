import React from "react";
import { FaCalendar } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { TbGiftFilled } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";

const service = [
  {
    id: 1,
    icon: <FaCalendar />,
    title: "Book An Appointment",
    desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
  },
  {
    id: 2,
    icon: <IoBag />,
    title: "Pick up in store",
    desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
  },
  {
    id: 3,
    icon: <TbGiftFilled />,
    title: "Special packaging",
    desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
  },
  {
    id: 4,
    icon: <LuRefreshCw />,
    title: "Free global returns",
    desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
  },
];

const Services = () => {
  return (
    <section data-aos="fade-up" className="py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="text-4xl text-gray-800 mb-4">
                {card.icon}
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-3">
                {card.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-6">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;