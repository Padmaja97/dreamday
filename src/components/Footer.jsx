import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'about' } });
    }
  };

  return (
    <footer>
        <div className="footer-container">
            <div className="footer-about">
                <div className="footer-logo">
                    <h2>Dream Day</h2>
                    <span>Events</span>
                </div>
                <p>Creating magical memories with premium aesthetics, gourmet catering, and signature setups led by creative visionary Ayush Kale.</p>
                <div className="manager-socials">
                    <a href="https://www.instagram.com/royal_eventanddecor?igsh=MXQ5bDI0NzBkbmhoaQ==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="https://wa.me/918459398321?text=Hi%20Dream%20Day%20Events%2C%20I%20am%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                </div>
            </div>
            
            <div className="footer-col">
                <h3>Quick Links</h3>
                <ul className="footer-links">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="/" onClick={handleAboutClick} style={{ cursor: 'pointer' }}>About Us</a></li>
                    <li><Link to="/services">Our Services</Link></li>
                    <li><Link to="/gallery">Recent Gallery</Link></li>
                    <li><Link to="/videos">Event Glimpses</Link></li>
                    <li><Link to="/packages">Pricing Packages</Link></li>
                    <li><Link to="/inquire">Contact Us</Link></li>
                </ul>
            </div>
            
            <div className="footer-col footer-contact-info">
                <h3>Contact Info</h3>
                <p><i className="fa-solid fa-phone" style={{ color: 'var(--gold-primary)' }}></i> +91 84593 98321</p>
                <p><i className="fa-solid fa-envelope" style={{ color: 'var(--gold-primary)' }}></i> Ayushkale0412@gmail.com</p>
                <p><i className="fa-solid fa-location-dot" style={{ color: 'var(--gold-primary)' }}></i> Premium Plaza, Suite 402, Senapati Bapat Road, Pune</p>
                <p><i className="fa-solid fa-clock" style={{ color: 'var(--gold-primary)' }}></i> Mon - Sun: 09:00 AM - 09:00 PM</p>
            </div>

            <div className="footer-col footer-map-col" style={{ flex: '1.2' }}>
                <h3>Find Us</h3>
                <div style={{ borderRadius: '12px', overflow: 'hidden', height: '200px', marginTop: '15px', border: '1px solid var(--border-color)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.5975618451877!2d73.8299839!3d18.5308225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf70d8a0d0a5%3A0xe441618a38c23e65!2sSenapati%20Bapat%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                        style={{ border: 0, width: '100%', height: '100%' }}>
                    </iframe>
                </div>
            </div>
        </div>
        
        <div className="footer-bottom">
            <p>&copy; 2026 Dream Day Events. All Rights Reserved. Managed by Mr. Ayush Kale.</p>
        </div>
    </footer>
  );
};

export default Footer;
