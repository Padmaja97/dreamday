import React, { useState } from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useLightbox } from '../utils/LightboxContext';
import { useData } from '../context/DataContext';

const Gallery = () => {
  useScrollAnimation();
  const { openLightbox } = useLightbox();
  const [filter, setFilter] = useState('all');

  const { galleryData } = useData();

  // Use Firebase data if available, otherwise fallback to empty array
  // We map the Firebase schema (url, title, type) to what the frontend expects (src, title, category)
  const dynamicGallery = galleryData ? galleryData.map(item => ({
    src: item.url,
    title: item.title || 'Gallery Image',
    category: item.type || 'uncategorized'
  })) : [];

  return (
    <main>
      {/* Gallery Hero Section */}
      <header className="portfolio-hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ Royal Visual Delights ✦</p>
          <h2 data-animate data-delay="250ms">Our <span className="gold-text">Creations Gallery</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Explore our stunning royal wedding stages, vibrant traditional haldi setups, and elite corporate decors designed by Mr. Ayush Kale.</p>
      </header>

      {/* Gallery Section */}
      <section className="gallery" id="gallery" style={{ paddingTop: '60px' }}>
          <div className="gallery-filters">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
              <button className={`filter-btn ${filter === 'wedding' ? 'active' : ''}`} onClick={() => setFilter('wedding')}>Wedding</button>
              <button className={`filter-btn ${filter === 'haldi' ? 'active' : ''}`} onClick={() => setFilter('haldi')}>Haldi</button>
              <button className={`filter-btn ${filter === 'corporate' ? 'active' : ''}`} onClick={() => setFilter('corporate')}>Corporate</button>
          </div>
          
          <div className="gallery-grid" id="dynamic-gallery-grid">
              {dynamicGallery.filter(item => filter === 'all' || item.category === filter).map((item, idx) => (
                  <div key={idx} className="gallery-item" data-category={item.category} data-animate onClick={() => openLightbox('photo', item.src)}>
                      <img src={item.src} alt={item.title} />
                      <div className="gallery-overlay">
                          <h4>{item.title}</h4>
                          <p>{item.category.toUpperCase()}</p>
                      </div>
                  </div>
              ))}
          </div>

          {/* Video Highlights Sub-Section */}
          <div className="video-highlights" style={{ marginTop: '100px' }} data-animate>
              <div className="section-header" style={{ marginBottom: '50px' }}>
                  <p className="hero-tagline" data-animate data-delay="100ms">✦ Experience the Magic ✦</p>
                  <h2 data-animate data-delay="250ms">Cinematic <span className="gold-text">Highlights</span></h2>
              </div>
              <div className="luxury-video-trio">
                  {/* Video 1 */}
                  <div className="video-trio-card" id="trio-player-1" onClick={() => openLightbox('video', 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-1.mp4')} style={{ cursor: 'pointer' }}>
                      <span className="video-trio-badge">Wedding Teaser</span>
                      <video autoPlay muted playsInline preload="auto" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style={{ backgroundImage: "url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9')" }}>
                          <source src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-1.mp4" type="video/mp4" />
                      </video>
                      <div className="video-trio-overlay">
                          <h3>Wedding Entrance Highlights</h3>
                          <p>A cinematic look at a luxury wedding entry setup with gold pillars and floral arches.</p>
                      </div>
                  </div>

                  {/* Video 2 */}
                  <div className="video-trio-card" id="trio-player-2" onClick={() => openLightbox('video', 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-2.mp4')} style={{ cursor: 'pointer' }}>
                      <span className="video-trio-badge">Stage Walkthrough</span>
                      <video autoPlay muted playsInline preload="auto" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style={{ backgroundImage: "url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9')" }}>
                          <source src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-2.mp4" type="video/mp4" />
                      </video>
                      <div className="video-trio-overlay">
                          <h3>Grand Reception Decor Reel</h3>
                          <p>Walkthrough showing the detailed lighting, chandeliers, and setup of a royal stage.</p>
                      </div>
                  </div>

                  {/* Video 3 */}
                  <div className="video-trio-card" id="trio-player-3" onClick={() => openLightbox('video', 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-3.mp4')} style={{ cursor: 'pointer' }}>
                      <span className="video-trio-badge">Haldi Highlight</span>
                      <video autoPlay muted playsInline preload="auto" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style={{ backgroundImage: "url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9')" }}>
                          <source src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-3.mp4" type="video/mp4" />
                      </video>
                      <div className="video-trio-overlay">
                          <h3>Vibrant Haldi Ceremony Clip</h3>
                          <p>A fun compilation clip of our signature traditional marigold haldi setups and props.</p>
                      </div>
                  </div>
              </div>
              {/* Direct Instagram Reels Link Button */}
              <div style={{ textAlign: 'center', marginTop: '50px' }} data-animate>
                  <a href="https://www.instagram.com/royal_eventanddecor/reels/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <i className="fa-brands fa-instagram" style={{ marginRight: '8px', color: 'var(--gold-primary)' }}></i>Check the Reel on Instagram
                  </a>
              </div>
          </div>
      </section>

      {/* Consultation CTA */}
      <section className="cta-banner" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', textAlign: 'center', padding: '60px 5%' }}>
          <h3 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>Have an event in mind? <span className="gold-text">Let's Craft It.</span></h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>Book your free 1-on-1 design layout consultation in Pune with Mr. Ayush Kale.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="/inquire" className="btn btn-primary">Book Consultation</a>
              <a href="https://wa.me/918459398321?text=Hi%20Dream%20Day%20Events%2C%20I%20am%20interested%20in%20booking%20an%20event." target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fa-brands fa-whatsapp" style={{ marginRight: '8px' }}></i>WhatsApp Chat
              </a>
          </div>
      </section>
    </main>
  );
};

export default Gallery;
