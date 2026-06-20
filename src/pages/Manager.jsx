import React from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useData } from '../context/DataContext';

const Manager = () => {
  useScrollAnimation();
  const { managerData } = useData();

  const defaultData = {
    name: 'Mr. Ayush Kale',
    title: 'Founder & Lead Event Manager',
    bio: "An event is not just a date on a calendar; it is a canvas of emotions, beauty, and memories. At Dream Day Events, we bring your visual imagination to life. We believe in providing the absolute best in class aesthetics and flawless execution so you can enjoy your dream day without a worry.",
    imageUrl: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/ayush-kale.jpg"
  };

  const data = { ...defaultData, ...(managerData || {}) };
  // Ensure we always have an image even if managerData.imageUrl is empty
  if (!data.imageUrl) {
    data.imageUrl = defaultData.imageUrl;
  }

  return (
    <main>
      {/* Manager Page Hero Banner */}
      <header className="portfolio-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('${data.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ Creative Direction ✦</p>
          <h2 data-animate data-delay="250ms">Meet <span className="gold-text">{data.name.split(' ').slice(-2).join(' ')}</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>The visionary designer, founder, and lead curator of Pune's royal setups.</p>
      </header>
      
      <section className="manager" id="manager">
          <div className="manager-container">
              <div className="manager-img-wrapper" data-animate>
                  <div className="manager-img">
                      <img src={data.imageUrl} alt={data.name} />
                  </div>
              </div>
              <div className="manager-info" data-animate>
                  <p className="hero-tagline">✦ The Creative Visionary ✦</p>
                  <h3>{data.name}</h3>
                  <h4 className="manager-title">{data.title || 'Founder & Lead Event Manager'}</h4>
                  <p className="manager-bio">"{data.bio}"</p>
                  <p className="manager-bio" style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>Under {data.name}'s creative direction, Dream Day Events has successfully coordinated over 200 premium weddings and corporate galas, bringing 8+ years of expertise to every single detail.</p>
                  <div className="manager-socials">
                      <a href="https://www.instagram.com/royal_eventanddecor?igsh=MXQ5bDI0NzBkbmhoaQ==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>

                      <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                      <a href="https://wa.me/918459398321?text=Hi%20Ayush%2C%20I%20would%20like%20to%20discuss%20decorating%20for%20my%20upcoming%20event." target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
              </div>
          </div>
      </section>

      {/* Instagram section removed */}
    </main>
  );
};

export default Manager;
