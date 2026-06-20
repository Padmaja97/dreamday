import React, { useState } from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Inquire = () => {
  useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    date: '',
    location: '',
    message: ''
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setFormData({
        name: '', phone: '', eventType: '', date: '', location: '', message: ''
      });
    } catch (error) {
      console.error("Error submitting inquiry: ", error);
      alert("There was an error submitting your inquiry. Please try again.");
    }
  };

  const handleWhatsApp = () => {
    const { name, phone, eventType, date, location, message } = formData;
    let msg = `Hi Dream Day Events! I would like to inquire about an event.\n\n`;
    if (name) msg += `Name: ${name}\n`;
    if (phone) msg += `Phone: ${phone}\n`;
    if (eventType) msg += `Event Type: ${eventType}\n`;
    if (date) msg += `Date: ${date}\n`;
    if (location) msg += `Location: ${location}\n`;
    if (message) msg += `\nMessage: ${message}`;

    const url = `https://wa.me/918459398321?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <main>
      {/* Inquire Hero Section */}
      <header className="portfolio-hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ Get In Touch ✦</p>
          <h2 data-animate data-delay="250ms">Plan Your <span className="gold-text">Celebration</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Fill out the form below and we'll get back to you shortly.</p>
      </header>

      {/* Contact Form Section */}
      <section className="contact" id="contact" style={{ padding: '80px 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh' }}>
          
          <div data-animate="fade-up" style={{
              width: '100%',
              maxWidth: '850px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              padding: '40px 50px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontFamily: "'Poppins', 'Helvetica', sans-serif"
          }}>
              <form id="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  {/* Row 1 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Full Name <span style={{color: '#ef4444'}}>*</span></label>
                          <input type="text" id="name" value={formData.name} onChange={handleChange} required placeholder="John Smith" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Phone <span style={{color: '#ef4444'}}>*</span></label>
                          <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
                      </div>
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label htmlFor="eventType" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Event type</label>
                          <select id="eventType" value={formData.eventType} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}>
                              <option value="" disabled>Select type</option>
                              <option value="wedding">Wedding Decoration</option>
                              <option value="corporate">Corporate Event</option>
                              <option value="other">Other</option>
                          </select>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label htmlFor="date" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Event date</label>
                          <input type="date" id="date" value={formData.date} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-secondary)', fontSize: '1rem', outline: 'none', colorScheme: 'dark' }} />
                      </div>
                  </div>

                  {/* Row 3 */}
                  <div className="form-group" style={{ margin: 0 }}>
                      <label htmlFor="location" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Preferred Location</label>
                      <input type="text" id="location" value={formData.location} onChange={handleChange} placeholder="Enter your preferred event location" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
                  </div>

                  {/* Row 4 */}
                  <div className="form-group" style={{ margin: 0 }}>
                      <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Message</label>
                      <textarea id="message" value={formData.message} onChange={handleChange} placeholder="Hello, I'm interested in event management services..." style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', height: '140px', resize: 'vertical', fontSize: '1rem', outline: 'none' }}></textarea>
                  </div>
                  
                  {/* Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '10px' }}>
                      <button type="submit" className="btn" style={{ background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '16px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                          Submit inquiry
                      </button>
                      <button type="button" onClick={handleWhatsApp} className="btn" style={{ background: 'transparent', color: '#25d366', border: '2px solid #25d366', padding: '16px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' }} onMouseOver={e => {e.currentTarget.style.background = '#25d366'; e.currentTarget.style.color = '#fff';}} onMouseOut={e => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#25d366';}}>
                          <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> WhatsApp Us
                      </button>
                  </div>

                  {/* Footer Text */}
                  <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', marginTop: '10px' }}>
                      By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </p>
              </form>
          </div>
      </section>

      {/* Toast Success Notification */}
      <div className="toast-msg" style={{ display: showToast ? 'block' : 'none', opacity: showToast ? 1 : 0, transition: 'opacity 0.3s' }}>
          <h4>✦ Thank you for contacting ✦</h4>
          <p>we will reach you shortly</p>
      </div>
    </main>
  );
};

export default Inquire;
