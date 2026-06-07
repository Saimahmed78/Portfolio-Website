import { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import { Link, useLocation } from "react-router";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${targetId}`);
      }
    }
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        {/* Logo */}
        <Link 
          to="/" 
          className="nav-logo relative z-50" 
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
              setIsOpen(false);
            }
          }}
        >
          <div className="nav-logo-icon">
            <FaRocket className="text-white text-sm" />
          </div>
          My Portfolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="nav-links">
            <Link to="/#about" className="nav-link" onClick={(e) => handleNavClick(e, "about")}>About</Link>
            <Link to="/#project" className="nav-link" onClick={(e) => handleNavClick(e, "project")}>Projects</Link>
            <Link to="/#skills" className="nav-link" onClick={(e) => handleNavClick(e, "skills")}>Skills</Link>
            <Link to="/#contact" className="nav-link" onClick={(e) => handleNavClick(e, "contact")}>Contact</Link>
          </div>

          <div className="nav-actions ml-4">
            <Link to="/login" className="btn-nav">Login</Link>
            <Link to="/register" className="btn-nav btn-nav-primary">Sign Up</Link>
          </div>
        </div>

        {/* CSS Animated Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition bg-transparent border-none outline-none cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out absolute left-1 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-2'}`} />
          <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out absolute left-1 top-1/2 -translate-y-1/2 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out absolute left-1 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-2'}`} />
        </button>
      </nav>

      {/* Slide-Down Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-40 bg-[var(--bg-void)] pt-24 px-6 pb-6 flex flex-col md:hidden transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="noise-overlay"></div>
        <div className="flex flex-col gap-6 text-center text-lg relative z-10">
          <Link to="/#about" className="nav-link text-xl" onClick={(e) => handleNavClick(e, "about")}>About</Link>
          <Link to="/#project" className="nav-link text-xl" onClick={(e) => handleNavClick(e, "project")}>Projects</Link>
          <Link to="/#skills" className="nav-link text-xl" onClick={(e) => handleNavClick(e, "skills")}>Skills</Link>
          <Link to="/#contact" className="nav-link text-xl" onClick={(e) => handleNavClick(e, "contact")}>Contact</Link>
        </div>
        
        <div className="flex flex-col gap-4 mt-10 px-4 relative z-10">
          <Link to="/login" className="btn-primary py-3" style={{ background: "transparent", border: "1px solid var(--border-card)" }} onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link to="/register" className="btn-primary py-3" onClick={() => setIsOpen(false)}>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
