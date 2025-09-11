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
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 font-medium text-gray-700">
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

          {/* Sign Up & Login Buttons */}
          <div className="flex gap-4 ml-6">
            <a
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Login
            </a>
          </div>
        </div>

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
          {/* Mobile Sign Up & Login Buttons */}
          <li className="flex gap-4 mt-2">
            <a
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1 text-center"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition flex-1 text-center"
            >
              Login
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
