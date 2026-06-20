import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const Services = () => {
  useScrollAnimation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (serviceId) => {
    setSelectedService(serviceId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <main>
      {/* Services Page Hero Banner */}
      <header className="portfolio-hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ What We Offer ✦</p>
          <h2 data-animate data-delay="250ms">Our <span className="gold-text">Bespoke Services</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Explore Pune's most premium luxury event decor, planning, and multi-cuisine catering solutions.</p>
      </header>

      <section className="services" id="services" style={{ paddingTop: '80px' }}>
          <div className="services-grid">
              {/* Service 1: Wedding Decor */}
              <div className="service-card" data-animate onClick={() => openModal('wedding-decor')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg" alt="Wedding Decor" className="service-card-img" />
                      <span className="service-badge">Most Popular</span>
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-ring"></i></div>
                      <h3>Wedding Decor</h3>
                      <span className="service-card-meta">250+ Weddings Decorated</span>
                      <p>Grand stage designs, beautiful mandaps, entrance archways and floral styling that leave a lasting impression.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Wedding Decor" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 2: Haldi & Mehndi Setup */}
              <div className="service-card" data-animate onClick={() => openModal('haldi-mehndi')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/haldi-yellow.jpg" alt="Haldi & Mehndi Setup" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-palette"></i></div>
                      <h3>Haldi & Mehndi Setup</h3>
                      <span className="service-card-meta">180+ Ceremonies Styled</span>
                      <p>Vibrant, colourful, and custom setups using fresh flowers and unique props matching your traditional themes.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Haldi and Mehndi" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 3: Reception Decor */}
              <div className="service-card" data-animate onClick={() => openModal('reception-decor')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg" alt="Reception Decor" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-champagne-glasses"></i></div>
                      <h3>Reception Decor</h3>
                      <span className="service-card-meta">120+ Grand Receptions</span>
                      <p>Ultra-modern layouts, ambient lighting setups, elegant drapes, and high-fashion lounges for post-wedding events.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Reception Decor" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 4: Gourmet Catering */}
              <div className="service-card" data-animate onClick={() => openModal('gourmet-catering')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg" alt="Gourmet Catering" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-hotdog"></i></div>
                      <h3>Gourmet Catering</h3>
                      <span className="service-card-meta">300+ Feasts Served</span>
                      <p>Exquisite culinary experience with premium serving displays, tailored menus, and professional hospitality staff.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Gourmet Catering" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 5: Themed Parties & Birthdays */}
              <div className="service-card" data-animate onClick={() => openModal('themed-parties')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg" alt="Themed Parties & Birthdays" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-cake-candles"></i></div>
                      <h3>Themed Parties & Birthdays</h3>
                      <span className="service-card-meta">150+ Celebrations</span>
                      <p>Creative themed designs, balloons, and customized decor for kids' birthdays and private social gatherings.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Themed Parties" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 6: Corporate Galas */}
              <div className="service-card" data-animate onClick={() => openModal('corporate-galas')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg" alt="Corporate Galas" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-briefcase"></i></div>
                      <h3>Corporate Galas</h3>
                      <span className="service-card-meta">90+ Corporate Events</span>
                      <p>Professional stage branding, audio-visual coordinate setups, premium conference decor, and awards night arrangements.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Corporate Event" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 7: Photography & Videography */}
              <div className="service-card" data-animate onClick={() => openModal('photography-videography')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-17.jpg" alt="Photography & Videography" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-camera"></i></div>
                      <h3>Photography & Videography</h3>
                      <span className="service-card-meta">200+ Shoots Covered</span>
                      <p>Cinematic highlight reels, professional event photography, and drone packages capturing every single emotion.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Photography" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 8: Entertainment & Live Music */}
              <div className="service-card" data-animate onClick={() => openModal('entertainment-music')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-18.jpg" alt="Entertainment & Live Music" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-music"></i></div>
                      <h3>Entertainment & Live Music</h3>
                      <span className="service-card-meta">100+ Live Stages</span>
                      <p>Live wedding bands, classical musicians, professional DJs, sound setups, and elite artist management.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Entertainment" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 9: Guest Transportation & Logistics */}
              <div className="service-card" data-animate onClick={() => openModal('transport-logistics')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg" alt="Guest Transportation & Logistics" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-car"></i></div>
                      <h3>Guest Transportation & Logistics</h3>
                      <span className="service-card-meta">70+ Event Fleets</span>
                      <p>Premium guest arrivals, vehicle arrangements, route coordination, and hospitality helpdesk management.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Transport" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>

              {/* Service 10: Floral Arrangements (standalone) */}
              <div className="service-card" data-animate onClick={() => openModal('floral-arrangements')}>
                  <div className="service-img-wrapper">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg" alt="Floral Arrangements" className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                      <div className="service-icon"><i className="fa-solid fa-seedling"></i></div>
                      <h3>Floral Arrangements</h3>
                      <span className="service-card-meta">500+ Floral Styles</span>
                      <p>Exotic floral setups, table centerpieces, fresh flower decorations, and customized boutique arrangements.</p>
                      <div className="service-card-actions">
                          <Link to="/inquire?service=Floral" className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                      </div>
                  </div>
              </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }} data-animate>
              <Link to="/packages" className="btn btn-secondary">View Event Packages</Link>
          </div>
      </section>

      {/* Service Detail Popup Modal */}
      {modalOpen && (
        <div id="service-modal" className="custom-modal" style={{ display: 'flex' }}>
            <div className="modal-backdrop" onClick={closeModal}></div>
            <div className="modal-content-wrapper">
                <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                <div className="modal-body-layout">
                    <div className="modal-info" style={{ flex: '1 1 100%' }}>
                        <span className="modal-service-badge" id="modal-service-badge">{selectedService}</span>
                        <h2 id="modal-service-title" className="gold-text">Inquire About This Service</h2>
                        <p className="modal-price-range" id="modal-service-price">We customize packages based on your requirements.</p>
                        <div className="modal-desc" id="modal-service-desc">Please contact us for more detailed information and a personalized quote for {selectedService}.</div>
                        
                        <div className="modal-actions" style={{ marginTop: '20px' }}>
                            <Link to={`/inquire?service=${selectedService}`} className="btn btn-primary">Inquire About This Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </main>
  );
};

export default Services;
