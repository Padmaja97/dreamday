import React, { useRef, useCallback } from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useLightbox } from '../utils/LightboxContext';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Videos = () => {
  useScrollAnimation();
  const { openLightbox } = useLightbox();
  const videoRefs = useRef({});

  const { videosData: videos } = useData();

  const handleMouseEnter = useCallback((idx) => {
    const video = videoRefs.current[idx];
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback((idx) => {
    const video = videoRefs.current[idx];
    if (video) {
      video.pause();
    }
  }, []);

  return (
    <main>
      {/* Videos Hero Section */}
      <header className="portfolio-hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ Event Teasers & Walks ✦</p>
          <h2 data-animate data-delay="250ms">Cinematic <span className="gold-text">Glimpses</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Step inside our magical designs through these video reels and setup walkthroughs. Hover over any video to preview it instantly.</p>
      </header>

      {/* Video Grid Section */}
      <section className="portfolio-section" style={{ paddingTop: '40px', minHeight: '60vh' }}>
          <div className="video-grid">
              {videos.map((vid, idx) => (
                  <div
                    key={idx}
                    className="video-card"
                    data-animate
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    onClick={() => openLightbox('video', vid.src)}
                  >
                      <div className="video-wrapper">
                          <span className="video-badge">{vid.badge}</span>
                          <video
                            ref={(el) => { videoRefs.current[idx] = el; }}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={vid.poster}
                            style={{ backgroundImage: `url('${vid.poster}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          >
                              <source src={vid.src} type="video/mp4" />
                          </video>
                          <div className="video-play-hint">
                              <i className="fa-solid fa-play"></i>
                          </div>
                      </div>
                      <div className="video-card-info">
                          <h3>{vid.title}</h3>
                          <p>{vid.desc}</p>
                      </div>
                  </div>
              ))}
          </div>
          {/* Direct Instagram Reels Link Button */}
          <div style={{ textAlign: 'center', marginTop: '50px' }} data-animate>
              <a href="https://www.instagram.com/royal_eventanddecor/reels/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fa-brands fa-instagram" style={{ marginRight: '8px', color: 'var(--gold-primary)' }}></i>Check the Reel on Instagram
              </a>
          </div>
      </section>

      {/* Consultation CTA */}
      <section className="cta-banner" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', textAlign: 'center', padding: '60px 5%' }}>
          <h3 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>Ready to create your <span className="gold-text">Dream Celebration?</span></h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>Let Mr. Ayush Kale and our design team craft a premium experience for you.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <Link to="/inquire" className="btn btn-primary">Send Enquiry</Link>
              <a href="https://wa.me/918459398321?text=Hi%20Dream%20Day%20Events%2C%20I%20am%20interested%20in%20booking%20an%20event." target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fa-brands fa-whatsapp" style={{ marginRight: '8px' }}></i>WhatsApp Chat
              </a>
          </div>
      </section>
    </main>
  );
};

export default Videos;
