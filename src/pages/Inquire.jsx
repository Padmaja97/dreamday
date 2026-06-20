import React, { useState } from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const Inquire = () => {
  useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    venue: '',
    guestCount: '',
    budget: '',
    message: ''
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // In a real app, send data to backend here
    setFormData({
      name: '', email: '', phone: '', eventType: '',
      date: '', venue: '', guestCount: '', budget: '', message: ''
    });
  };

  const handleWhatsApp = () => {
    const { name, phone, eventType, date, venue, guestCount, budget, message } = formData;
    let msg = `Hi Dream Day Events! I would like to inquire about an event.\n\n`;
    if (name) msg += `Name: ${name}\n`;
    if (phone) msg += `Phone: ${phone}\n`;
    if (eventType) msg += `Event Type: ${eventType}\n`;
    if (date) msg += `Date: ${date}\n`;
    if (venue) msg += `Venue: ${venue}\n`;
    if (guestCount) msg += `Guests: ${guestCount}\n`;
    if (budget) msg += `Budget: ${budget}\n`;
    if (message) msg += `\nMessage: ${message}`;

    const url = `https://wa.me/918459398321?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <main>
      {/* Inquire Hero Section */}
      <header className="portfolio-hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ Event Consultation ✦</p>
          <h2 data-animate data-delay="250ms">Plan Your <span className="gold-text">Bespoke Celebration</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Fill in the details below to share your vision, guest count, and requirements with our design team.</p>
      </header>

      {/* Contact Form Section */}
      <section className="contact" id="contact" style={{ paddingTop: '50px', minHeight: '70vh' }}>
          <div className="contact-container">
              <div className="contact-form-wrapper" data-animate="slide-left">
                  <form id="contact-form" onSubmit={handleSubmit}>
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="name">Your Name</label>
                              <input type="text" id="name" className="form-control" required placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                          </div>
                          <div className="form-group">
                              <label htmlFor="email">Email Address</label>
                              <input type="email" id="email" className="form-control" required placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="phone">Phone Number</label>
                              <input type="tel" id="phone" className="form-control" required placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                          </div>
                          <div className="form-group">
                              <label htmlFor="eventType">Event Type</label>
                              <select id="eventType" className="form-control" required value={formData.eventType} onChange={handleChange}>
                                  <option value="" disabled>Select event category</option>
                                  <option value="wedding">Wedding Decoration & Stage</option>
                                  <option value="haldi">Haldi & Mehndi Setup</option>
                                  <option value="reception">Reception Decor</option>
                                  <option value="catering">Gourmet Catering Services</option>
                                  <option value="birthday">Birthday or Theme Party</option>
                                  <option value="corporate">Corporate Event</option>
                                  <option value="photography">Photography & Videography</option>
                                  <option value="entertainment">Entertainment & Live Music</option>
                                  <option value="transport">Guest Transportation & Logistics</option>
                                  <option value="floral">Floral Arrangements (standalone)</option>
                                  <option value="other">Other Celebration</option>
                              </select>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="date">Event Date</label>
                              <input type="date" id="date" className="form-control" required value={formData.date} onChange={handleChange} />
                          </div>
                          <div className="form-group">
                              <label htmlFor="venue">Event Venue (if known)</label>
                              <input type="text" id="venue" className="form-control" placeholder="Enter venue name or city" value={formData.venue} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="guestCount">Approximate Guest Count</label>
                              <input type="number" id="guestCount" className="form-control" placeholder="e.g., 150" min="1" value={formData.guestCount} onChange={handleChange} />
                          </div>
                          <div className="form-group">
                              <label htmlFor="budget">Budget Range</label>
                              <select id="budget" className="form-control" value={formData.budget} onChange={handleChange}>
                                  <option value="" disabled>Select budget range</option>
                                  <option value="under-50k">Under ₹50,000</option>
                                  <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                                  <option value="1l-2l">₹1,00,000 - ₹2,00,000</option>
                                  <option value="2l-5l">₹2,00,000 - ₹5,00,000</option>
                                  <option value="above-5l">Above ₹5,00,000</option>
                              </select>
                          </div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="message">Message / Special Requirements</label>
                          <textarea id="message" className="form-control" placeholder="Describe your vision, decor preferences, theme ideas, or other special requirements..." value={formData.message} onChange={handleChange}></textarea>
                      </div>
                      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                          <button type="submit" className="btn btn-primary">Send Email</button>
                          <button type="button" onClick={handleWhatsApp} className="btn btn-secondary" style={{ background: '#25d366', color: 'white', border: '1px solid #25d366' }}>
                              <i className="fa-brands fa-whatsapp" style={{ marginRight: '8px' }}></i>Inquire on WhatsApp
                          </button>
                      </div>
                  </form>
              </div>
              
              <div className="contact-info-wrapper" data-animate="slide-right">
                  <div>
                      <div className="info-item">
                          <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
                          <div className="info-text">
                              <h4>Call or WhatsApp Us</h4>
                              <p>+91 84593 98321</p>
                          </div>
                      </div>
                      <div className="info-item">
                          <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                          <div className="info-text">
                              <h4>Email Enquiries</h4>
                              <p>Ayushkale0412@gmail.com</p>
                          </div>
                      </div>
                      <div className="info-item">
                          <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                          <div className="info-text">
                              <h4>Office Address</h4>
                              <p>Premium Plaza, Suite 402, Senapati Bapat Road, Pune, Maharashtra - 411016</p>
                          </div>
                      </div>
                  </div>

                  <div className="map-placeholder">
                      <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.5975618451877!2d73.8299839!3d18.5308225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf70d8a0d0a5%3A0xe441618a38c23e65!2sSenapati%20Bapat%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                          allowFullScreen="" 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps Location"
                          style={{ width: '100%', height: '100%', border: '0', borderRadius: '12px' }}>
                      </iframe>
                  </div>
              </div>
          </div>
      </section>

      {/* Toast Success Notification */}
      <div className="toast-msg" style={{ display: showToast ? 'block' : 'none', opacity: showToast ? 1 : 0, transition: 'opacity 0.3s' }}>
          <h4>✦ Enquiry Submitted Successfully! ✦</h4>
          <p>Mr. Ayush Kale or a team member will reach out to you shortly.</p>
      </div>
    </main>
  );
};

export default Inquire;
