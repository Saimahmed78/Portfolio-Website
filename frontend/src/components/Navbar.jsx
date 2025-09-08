import { useState } from "react";
import { FaBars, FaTimes, FaRocket } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center text-xl font-bold text-gray-800 gap-2">
          <FaRocket className="text-blue-600 text-2xl" /> My Portfolio
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li>
            <a href="/about" className="hover:text-blue-600 transition">
              About
            </a>
          </li>
          <li>
            <a href="/project" className="hover:text-blue-600 transition">
              Projects
            </a>
          </li>
          <li>
            <a href="/skills" className="hover:text-blue-600 transition">
              Skills
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger Button */}
        <div
          className="md:hidden text-2xl cursor-pointer select-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col gap-4 bg-white border-t border-gray-200 px-6 py-4 md:hidden">
          <li>
            <a href="/about" className="hover:text-blue-600 transition">
              About
            </a>
          </li>
          <li>
            <a href="/project" className="hover:text-blue-600 transition">
              Projects
            </a>
          </li>
          <li>
            <a href="/skills" className="hover:text-blue-600 transition">
              Skills
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
