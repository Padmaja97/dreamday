import React, { useState } from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useLightbox } from '../utils/LightboxContext';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  useScrollAnimation();
  const { openLightbox } = useLightbox();
  const [filter, setFilter] = useState('all');

  const portfolioItems = [
    {
        type: 'photo',
        category: 'haldi',
        src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9',
        tag: 'Haldi Ceremony',
        title: 'Emerald Dreamcatcher Haldi',
        desc: 'Bespoke green-themed haldi setup with fresh marigolds and handcrafted dreamcatchers.',
        caseStudy: 'Designed for an outdoor lawn gathering of 200 guests. Hand-threaded floral strings took 14 hours of preparation.',
        quote: '"The decor felt like walking into a fairy tale. Our guests loved it!"',
        author: '- Sneha K.'
    },
    {
        type: 'photo',
        category: 'wedding',
        src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9',
        tag: 'Wedding Decor',
        title: 'Royal Monogram Stage',
        desc: 'A grand, royal wedding stage featuring a custom golden monogram centerpiece and ambient warm lighting.',
        caseStudy: 'Constructed for a high-profile banquet wedding in Pune. Integrated a 40ft wide backdrop with velvet draping and automated lighting.',
        quote: '"Ayush Kale turned our dream stage into reality. The monogram was outstanding."',
        author: '- Rahul & Priya S.'
    },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', tag: 'Wedding Decor', title: 'Royal White Arch Stage', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-4.jpg?v=9', tag: 'Wedding Decor', title: 'Elysian Banquet Tablescape', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    {
        type: 'photo',
        category: 'haldi',
        src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9',
        tag: 'Haldi Ceremony',
        title: 'Vibrant Haldi Styling',
        desc: 'Traditional yellow haldi theme blended with contemporary structures and floral arches.',
        caseStudy: 'Coordinated inside a heritage courtyard. Used 50kg of fresh marigolds and customized seating zones.',
        quote: '"The vibrant setup completely transformed our family courtyard."',
        author: '- Pooja R.'
    },
    { type: 'photo', category: 'haldi', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-6.jpg?v=9', tag: 'Haldi Ceremony', title: 'Traditional Yellow Haldi Backdrop', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'haldi', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-7.jpg?v=9', tag: 'Haldi Ceremony', title: 'Traditional Saffron Haldi', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'haldi', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-8.jpg?v=9', tag: 'Haldi Ceremony', title: 'Outdoor Haldi Swing', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9', tag: 'Wedding Decor', title: 'Saffron Mandap Layout', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'corporate', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg?v=9', tag: 'Corporate Event', title: 'Gala Banquet Table Setup', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    {
        type: 'photo',
        category: 'corporate',
        src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-11.jpg?v=9',
        tag: 'Corporate Event',
        title: 'Elite Corporate Stage Setup',
        desc: 'Professional panel stage branding with matte flooring, structural trusses, and HD screen integration.',
        caseStudy: 'Developed for a national business summit. Delivered seamless AV setups and registration desk branding.',
        quote: '"Highly professional setup that matched our international corporate branding standards."',
        author: '- TechCorp Summit Committee'
    },
    { type: 'photo', category: 'corporate', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg?v=9', tag: 'Corporate Event', title: 'Annual Business Award Night', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-13.jpg?v=9', tag: 'Wedding Decor', title: 'Royal Pink Backdrop Stage', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'corporate', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg?v=9', tag: 'Corporate Event', title: 'Product Launch Backdrop', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-15.jpg?v=9', tag: 'Wedding Decor', title: 'Grand Floral Arch Stage', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'corporate', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-16.jpg?v=9', tag: 'Corporate Event', title: 'Shareholders Meeting Stage', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'corporate', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-17.jpg?v=9', tag: 'Corporate Event', title: 'Corporate Branding Pavilion', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'corporate', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-18.jpg?v=9', tag: 'Corporate Event', title: 'Executive VIP Lounge Area', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'corporate', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-19.jpg?v=9', tag: 'Corporate Event', title: 'Blue Theme Gala Banquet', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-20.jpg?v=9', tag: 'Wedding Decor', title: 'Bespoke Monogram Wedding Stage', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', tag: 'Wedding Decor', title: 'Elysian Crystal Stage', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'haldi', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg?v=9', tag: 'Haldi Ceremony', title: 'Symphony of Marigolds', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'photo', category: 'wedding', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-23.jpg?v=9', tag: 'Wedding Decor', title: 'Royal Blue & White Stage', desc: 'Signature design setup delivered by Mr. Ayush Kale.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-1.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', tag: 'Video Highlights', title: 'Wedding Entrance Highlights', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-2.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', tag: 'Video Highlights', title: 'Grand Reception Decor Reel', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-3.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9', tag: 'Video Highlights', title: 'Vibrant Haldi Ceremony Clip', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-4.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-4.jpg?v=9', tag: 'Video Highlights', title: 'Catering Buffet Setup Video', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-5.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', tag: 'Video Highlights', title: 'Bespoke Floral Work Highlights', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-6.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', tag: 'Video Highlights', title: 'Lawn Celebration Tour', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-7.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', tag: 'Video Highlights', title: 'Bride & Groom Entrance Setup', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-8.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-8.jpg?v=9', tag: 'Video Highlights', title: 'Traditional Marigold Swing Tour', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-9.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', tag: 'Video Highlights', title: 'Banquet Stage Decoration', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-10.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-7.jpg?v=9', tag: 'Video Highlights', title: 'Haldi Ceremony Highlights', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-11.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg?v=9', tag: 'Video Highlights', title: 'Haldi Ceremony of Eram', desc: 'Cinematic video compilation of decorations and Feasts.' },
    { type: 'video', category: 'video', src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-12.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9', tag: 'Video Highlights', title: 'Saffron Mandap Cinematic', desc: 'Cinematic video compilation of decorations and Feasts.' }
  ];

  return (
    <main>
      {/* Portfolio Hero Section */}
      <header className="portfolio-hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ Our Work Showcase ✦</p>
          <h2 data-animate data-delay="250ms">The <span className="gold-text">Bespoke Portfolio</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>A curated gallery of our premium stage setups, haldi ceremonies, and luxury event design.</p>
      </header>

      {/* Portfolio Filter & Grid Section */}
      <section className="portfolio-section" style={{ paddingTop: '40px', minHeight: '60vh' }}>
          <div className="gallery-filters">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Portfolio</button>
              <button className={`filter-btn ${filter === 'wedding' ? 'active' : ''}`} onClick={() => setFilter('wedding')}>Weddings</button>
              <button className={`filter-btn ${filter === 'haldi' ? 'active' : ''}`} onClick={() => setFilter('haldi')}>Haldi & Mehndi</button>
              <button className={`filter-btn ${filter === 'corporate' ? 'active' : ''}`} onClick={() => setFilter('corporate')}>Corporate</button>
              <button className={`filter-btn ${filter === 'video' ? 'active' : ''}`} onClick={() => setFilter('video')}>Video Clips</button>
          </div>

          <div className="portfolio-grid" id="dynamic-portfolio-grid">
              {portfolioItems.filter(item => filter === 'all' || item.category === filter).map((item, idx) => (
                  <div key={idx} className="portfolio-card" data-animate>
                      <div className="portfolio-img-wrapper" style={{ position: item.type === 'video' ? 'relative' : 'static' }} onClick={() => openLightbox(item.type, item.src)}>
                          <span className="portfolio-tag" style={item.type === 'video' ? { background: 'var(--gold-gradient)', color: '#070d1e', zIndex: 3 } : {}}>{item.tag}</span>
                          {item.type === 'photo' ? (
                              <img src={item.src} alt={item.title} />
                          ) : (
                              <>
                                  <video muted loop autoPlay playsInline preload="metadata" style={{ backgroundImage: `url('${item.poster}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                                      <source src={item.src} type="video/mp4" />
                                  </video>
                                  <div className="video-play-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-primary)', fontSize: '3.2rem', zIndex: 2, pointerEvents: 'none' }}>
                                      <i className="fa-solid fa-circle-play"></i>
                                  </div>
                              </>
                          )}
                      </div>
                      <div className="portfolio-info">
                          <h3>{item.title}</h3>
                          <p>{item.desc}</p>
                          {item.caseStudy && (
                              <div className="portfolio-case-study">
                                  <strong>Case Study:</strong> {item.caseStudy}
                              </div>
                          )}
                          {item.quote && (
                              <div className="portfolio-client-quote">
                                  <i className="fa-solid fa-quote-left"></i> {item.quote} <span className="quote-author">{item.author}</span>
                              </div>
                          )}
                      </div>
                  </div>
              ))}
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

export default Portfolio;
