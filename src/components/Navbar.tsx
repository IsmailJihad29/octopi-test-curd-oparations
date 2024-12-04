import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className=" p-2 shadow-md text-black">
      <nav className="max-w-7xl mx-auto flex items-center justify-between ">
        {/* Logo */}
        <div className=" text-2xl font-bold">
          <a href="/">MyLogo</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className=" hover:text-gray-300">Home</a>
          <a href="/about" className=" hover:text-gray-300">About</a>
          <a href="/services" className=" hover:text-gray-300">Services</a>
          <a href="/contact" className=" hover:text-gray-300">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white space-y-4 p-4">
          <a href="/" className="block hover:text-gray-300">Home</a>
          <a href="/about" className="block hover:text-gray-300">About</a>
          <a href="/services" className="block hover:text-gray-300">Services</a>
          <a href="/contact" className="block hover:text-gray-300">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
