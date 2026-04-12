import { Search } from "lucide-react";
import React from "react";
import leftImg from "../../../../../assets/bg-hero-left.png";
import rightImg from "../../../../../assets/bg-hero-right.png";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[550px] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-[#fdf2f8] via-[#ffffff] to-[#eff6ff] overflow-hidden">
      {/* Left Side Decorative Image */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 max-w-[300px] opacity-60 hidden md:block select-none pointer-events-none">
        <img
          src={leftImg}
          alt="Decorative wave left"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Side Decorative Image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 max-w-[300px] opacity-60 hidden md:block select-none pointer-events-none">
        <img
          src={rightImg}
          alt="Decorative wave right"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1e293b] leading-tight">
          Deal Your <span className="text-[#8b5cf6]">Products</span> <br />
          In A <span className="text-[#8b5cf6]">Smart</span> Way !
        </h1>

        <p className="mt-6 text-gray-500 text-lg md:text-xl font-medium">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        {/* Search Bar Container */}
        <div className="mt-10 relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="search For Products, Categories..."
            className="w-full py-4 px-6 pr-16 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-600 italic"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#8b5cf6] p-3 rounded-full text-white hover:bg-[#7c3aed] transition-colors">
            <Search size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="bg-[#8b5cf6] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#7c3aed] transition-all shadow-md">
            Watch All Products
          </button>
          <button className="border-2 border-[#8b5cf6] text-[#8b5cf6] bg-purple-50 px-8 py-3 rounded-md font-semibold hover:bg-purple-100 transition-all">
            Post an Product
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
