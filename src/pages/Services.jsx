import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useData } from '../context/DataContext';

const Services = () => {
  useScrollAnimation();
  const { servicesData } = useData();
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
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Explore Nagpur's most premium luxury event decor, planning, and multi-cuisine catering solutions.</p>
      </header>

      <section className="services" id="services" style={{ paddingTop: '80px' }}>
          <div className="services-grid">
              {servicesData && servicesData.map(service => (
                  <div key={service.id} className="service-card" data-animate onClick={() => openModal(service)}>
                      <div className="service-img-wrapper">
                          <img src={service.img} alt={service.title} className="service-card-img" />
                          {service.badge && <span className="service-badge">{service.badge}</span>}
                      </div>
                      <div className="service-card-content">
                          <h3>{service.title}</h3>
                          {service.meta && <span className="service-card-meta">{service.meta}</span>}
                          <p>{service.desc}</p>
                          <div className="service-card-actions">
                              <Link to={`/inquire?service=${service.inquireText}`} className="btn btn-card-inquire" onClick={(e) => e.stopPropagation()}>Inquire Now</Link>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }} data-animate>
              <Link to="/packages" className="btn btn-secondary">View Event Packages</Link>
          </div>
      </section>

      {/* Service Detail Popup Modal */}
      {modalOpen && selectedService && (
        <div id="service-modal" className="custom-modal" style={{ display: 'flex' }}>
            <div className="modal-backdrop" onClick={closeModal}></div>
            <div className="modal-content-wrapper">
                <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                <div className="modal-body-layout">
                    <div className="modal-gallery" style={{ height: '100%', minHeight: '300px', borderRadius: '15px', overflow: 'hidden' }}>
                         <img src={selectedService.img} alt={selectedService.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="modal-info">
                        <span className="modal-service-badge" id="modal-service-badge">{selectedService.title}</span>
                        <h2 id="modal-service-title" className="gold-text">Inquire About This Service</h2>
                        <p className="modal-price-range" id="modal-service-price">We customize packages based on your requirements.</p>
                        <div className="modal-desc" id="modal-service-desc">{selectedService.desc}</div>
                        
                        <div className="modal-actions" style={{ marginTop: '30px' }}>
                            <Link to={`/inquire?service=${selectedService.inquireText}`} className="btn btn-primary">Inquire Now</Link>
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
