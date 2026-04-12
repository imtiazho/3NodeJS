import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#001529] text-gray-400 py-10 px-4 md:px-20">
      <div className="footer max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Brand Section */}
        <aside className="max-w-xs">
          <h2 className="text-2xl font-bold text-white mb-4">
            Smart<span className="text-[#7c4dff]">Deals</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Your trusted marketplace for authentic local products. 
            Discover the best deals from across Bangladesh.
          </p>
        </aside>

        {/* Quick Links */}
        <nav className="flex flex-col">
          <h6 className="footer-title text-white opacity-100 normal-case text-lg mb-4">Quick Links</h6>
          <a className="link link-hover mb-2">All Products</a>
          <a className="link link-hover mb-2">Dashboard</a>
          <a className="link link-hover mb-2">Login</a>
          <a className="link link-hover mb-2">Register</a>
        </nav>

        {/* Categories */}
        <nav className="flex flex-col">
          <h6 className="footer-title text-white opacity-100 normal-case text-lg mb-4">Categories</h6>
          <a className="link link-hover mb-2">Electronics</a>
          <a className="link link-hover mb-2">Fashion</a>
          <a className="link link-hover mb-2">Home & Living</a>
          <a className="link link-hover mb-2">Groceries</a>
        </nav>

        {/* Contact & Support */}
        <nav className="flex flex-col">
          <h6 className="footer-title text-white opacity-100 normal-case text-lg mb-4">Contact & Support</h6>
          <div className="flex items-center gap-3 mb-3">
            <FaEnvelope className="text-gray-400" />
            <span className="text-sm">support@Smartdeals.com</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FaPhoneAlt className="text-gray-400" />
            <span className="text-sm">+880 123 456 789</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-gray-400 self-start mt-1" />
            <span className="text-sm">123 Commerce Street,<br />Dhaka, Bangladesh</span>
          </div>
        </nav>

        {/* Social Links */}
        <nav className="flex flex-col">
          <h6 className="footer-title text-white opacity-100 normal-case text-lg mb-4">Social Links</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="#" className="bg-white p-2 rounded-full text-black hover:bg-[#7c4dff] hover:text-white transition-colors">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="bg-white p-2 rounded-full text-black hover:bg-[#7c4dff] hover:text-white transition-colors">
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" className="bg-white p-2 rounded-full text-black hover:bg-[#7c4dff] hover:text-white transition-colors">
              <FaFacebookF size={16} />
            </a>
          </div>
        </nav>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
        <p>© 2025 SmartDeals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;