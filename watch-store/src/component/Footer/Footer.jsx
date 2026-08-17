import { Link } from 'react-router-dom';
import logo from '../../assets/main-logo.png'
export default function Footer() {
  const socialIcons = [
    {
      name: "Facebook",
      path: (
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
      ),
    },
    {
      name: "Twitter",
      path: (
        <path d="M23 4.9c-.8.4-1.7.6-2.6.8a4.6 4.6 0 0 0 2-2.5c-.9.5-1.8.9-2.9 1.1a4.5 4.5 0 0 0-7.7 4.1A12.9 12.9 0 0 1 2.6 3.6a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1c0 2.2 1.6 4 3.6 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1a4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 19.5 12.8 12.8 0 0 0 7.9 21c8.3 0 12.9-6.9 12.9-12.9v-.6c.9-.6 1.6-1.4 2.2-2.3z" />
      ),
    },
    {
      name: "Youtube",
      path: (
        <path d="M22.5 6.2a2.8 2.8 0 0 0-2-2C18.8 3.8 12 3.8 12 3.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 11.9a29 29 0 0 0 .5 5.7 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-5.7 29 29 0 0 0-.5-5.7zM9.8 15.3V8.5l6 3.4z" />
      ),
    },
    {
      name: "Instagram",
      path: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 11.4a4 4 0 1 1-7.9-1.2 4 4 0 0 1 7.9 1.2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.5" cy="6.5" r="1" />
        </>
      ),
    },
  ];

  const linkClass = "footer-link";

  return (
    <footer className="bg-white border-t border-gray-100">
      <style>{`
        .footer-link {
          position: relative;
          background-image: linear-gradient(currentColor, currentColor);
          background-position: left bottom;
          background-repeat: no-repeat;
          background-size: 0% 1px;
          transition: background-size 0.35s ease;
        }
        .footer-link:hover {
          background-size: 100% 1px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to='/' className="text-2xl font-light tracking-widest text-gray-800">
            <img src={logo} alt="" />
          </Link>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-xs">
            Gravida massa volutpat aenean odio. Amet, turpis erat nullam
            fringilla elementum diam in. Nisi, purus vitae, ultrices nunc.
            Sit ac sit suscipit hendrerit.
          </p>
          <div className="flex gap-3 mt-5">
            {socialIcons.map((icon, i) => (
              
               <a key={i}
                href="#"
                aria-label={icon.name}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  {icon.path}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-semibold tracking-wide mb-4">
            QUICK LINKS
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/" className={linkClass}>HOME</Link></li>
            <li><Link to="/about" className={linkClass}>ABOUT</Link></li>
            <li><Link to="/shop" className={linkClass}>SERVICES</Link></li>
            <li><Link to="#" className={linkClass}>SINGLE ITEM</Link></li>
            <li><Link to="/contact" className={linkClass}>CONTACT</Link></li>
          </ul>
        </div>

        {/* Help & Info */}
        <div>
          <h3 className="text-gray-900 font-semibold tracking-wide mb-4">
            HELP & INFO
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/ordertracking" className={linkClass}>TRACK YOUR ORDER</Link></li>
            <li><Link to="#" className={linkClass}>RETURNS + EXCHANGES</Link></li>
            <li><Link to="#" className={linkClass}>SHIPPING + DELIVERY</Link></li>
            <li><Link to="#" className={linkClass}>CONTACT US</Link></li>
            <li><Link to="#" className={linkClass}>FIND US EASY</Link></li>
            <li><Link to="/faqs" className={linkClass}>FAQS</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-gray-900 font-semibold tracking-wide mb-4">
            CONTACT US
          </h3>
          <p className="text-gray-400 text-sm">
            Do you have any questions or suggestions?
          </p>
          <Link to="" className={`text-gray-800 text-sm mt-1 ${linkClass}`}>contact@yourcompany.com</Link>

          <p className="text-gray-400 text-sm mt-4">
            Do you need support? Give us a call.
          </p>
          <Link to="" className={`text-gray-800 text-sm mt-1 ${linkClass}`}>+43 720 115 278</Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>We accept:</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
          </div>
          <p className="text-sm text-gray-500">
            © Copyright 2025 Elegant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}