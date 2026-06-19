import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 || !isHomepage) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);



  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <Link to="/" className="navbar-brand" style={{ flex: 1 }}>
            <h1>Dream Day</h1>
            <span>Events</span>
        </Link>

        <ul className={`nav-menu ${menuActive ? 'active' : ''}`} id="nav-menu" style={{ flex: 1, justifyContent: 'center' }}>
            <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Home</Link></li>
            <li><Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>About</Link></li>
            <li><Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Services</Link></li>
            <li><Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Gallery</Link></li>
            <li><Link to="/videos" className={`nav-link ${location.pathname === '/videos' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Videos</Link></li>
            <li><Link to="/packages" className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Packages</Link></li>
            <li><Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Blog</Link></li>
            <li><Link to="/manager" className={`nav-link ${location.pathname === '/manager' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Manager</Link></li>
            <li><Link to="/inquire" className={`nav-link ${location.pathname === '/inquire' ? 'active' : ''}`} onClick={() => setMenuActive(false)}>Contact</Link></li>
        </ul>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'flex-end' }}>
            <div className="nav-toggle" id="nav-toggle" onClick={() => setMenuActive(!menuActive)}>
                <i className={`fa-solid ${menuActive ? 'fa-xmark' : 'fa-bars'}`}></i>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
