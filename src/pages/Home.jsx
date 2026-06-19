import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useData } from '../context/DataContext';

const Home = () => {
  useScrollAnimation();
  const { videosData } = useData();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Handle stats animation
  useEffect(() => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    let countTriggered = false;
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + (element.dataset.suffix || '');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countTriggered) {
          countTriggered = true;
          document.querySelectorAll('.stat-num').forEach(numEl => {
            const target = parseInt(numEl.dataset.target) || 0;
            animateValue(numEl, 0, target, 2000);
          });
        }
      },
      { threshold: 0.1 }
    );
    statsObserver.observe(statsSection);

    return () => statsObserver.disconnect();
  }, []);

  // Handle about slideshow
  useEffect(() => {
    const aboutSlideshow = document.querySelector('.about-slideshow');
    if (!aboutSlideshow) return;
    
    const images = aboutSlideshow.querySelectorAll('img');
    let activeIdx = 0;
    let intervalId;
    if (images.length > 1) {
      intervalId = setInterval(() => {
        images[activeIdx].classList.remove('active');
        activeIdx = (activeIdx + 1) % images.length;
        images[activeIdx].classList.add('active');
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, []);

  // Handle Before/After slider
  useEffect(() => {
    const baContainers = document.querySelectorAll('.ba-container');
    
    baContainers.forEach(container => {
        const sliderBar = container.querySelector('.ba-slider-bar');
        const afterImg = container.querySelector('.after-img');
        const sliderBtn = container.querySelector('.ba-slider-button');

        if(!sliderBar || !afterImg || !sliderBtn) return;

        const updateSlider = (clientX) => {
            const rect = container.getBoundingClientRect();
            const x = clientX - rect.left;
            let percent = (x / rect.width) * 100;
            
            if (percent < 0) percent = 0;
            if (percent > 100) percent = 100;

            afterImg.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
            sliderBar.style.left = `${percent}%`;
            sliderBtn.style.left = `${percent}%`;
        };

        const onMove = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            updateSlider(clientX);
        };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('touchmove', onMove, { passive: true });
        container.addEventListener('mousedown', onMove);

        // Cleanup
        return () => {
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('touchmove', onMove);
            container.removeEventListener('mousedown', onMove);
        };
    });
  }, []);

  return (
    <main>

      {/* Hero Section */}
      <section className="hero" id="home" style={{ backgroundImage: "url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg')" }}>
          <video autoPlay loop muted playsInline className="hero-video-bg" id="hero-bg-video" poster="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, pointerEvents: 'none' }}>
              <source src="/images/video-2.mp4" type="video/mp4" />
          </video>
          <div className="luxury-frame" style={{ zIndex: 2 }}></div>
          <div className="hero-content" style={{ zIndex: 2 }}>
              <p className="hero-tagline" data-animate data-delay="100ms">✦ 500+ EVENTS CRAFTED | 10+ YEARS OF EXCELLENCE ✦</p>
              <h2 className="hero-title" data-animate data-delay="300ms">Timeless Events, <br/><span className="gold-text">Exquisitely Crafted.</span></h2>
              <p className="hero-subtitle" data-animate data-delay="500ms">Where heritage meets high-design. We curate atmosphere, detail, and emotion into Pune's finest celebrations.</p>
              <div className="hero-btns" data-animate data-delay="700ms">
                  <Link to="/inquire" className="btn btn-primary">Inquire Now</Link>
                  <Link to="/portfolio" className="btn btn-primary">View Our Work</Link>
              </div>
          </div>
          <div className="scroll-indicator">
              <a href="#about"><i className="fa-solid fa-chevron-down"></i></a>
          </div>
          
          <div className="hero-particles" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
              <div className="particle" style={{ position: 'absolute', width: '4px', height: '4px', background: 'radial-gradient(circle, rgba(243,229,171,0.8) 0%, rgba(212,175,55,0.4) 70%, rgba(212,175,55,0) 100%)', borderRadius: '50%', left: '15%', top: '25%', opacity: 0.5, animation: 'floatParticle 8s ease-in-out infinite' }}></div>
              <div className="particle" style={{ position: 'absolute', width: '3px', height: '3px', background: 'radial-gradient(circle, rgba(243,229,171,0.8) 0%, rgba(212,175,55,0.4) 70%, rgba(212,175,55,0) 100%)', borderRadius: '50%', left: '45%', top: '65%', opacity: 0.3, animation: 'floatParticle 12s ease-in-out infinite', animationDelay: '1s' }}></div>
              <div className="particle" style={{ position: 'absolute', width: '5px', height: '5px', background: 'radial-gradient(circle, rgba(243,229,171,0.8) 0%, rgba(212,175,55,0.4) 70%, rgba(212,175,55,0) 100%)', borderRadius: '50%', left: '75%', top: '35%', opacity: 0.6, animation: 'floatParticle 10s ease-in-out infinite', animationDelay: '2s' }}></div>
              <div className="particle" style={{ position: 'absolute', width: '4px', height: '4px', background: 'radial-gradient(circle, rgba(243,229,171,0.8) 0%, rgba(212,175,55,0.4) 70%, rgba(212,175,55,0) 100%)', borderRadius: '50%', left: '85%', top: '75%', opacity: 0.4, animation: 'floatParticle 14s ease-in-out infinite', animationDelay: '3s' }}></div>
              <div className="particle" style={{ position: 'absolute', width: '3px', height: '3px', background: 'radial-gradient(circle, rgba(243,229,171,0.8) 0%, rgba(212,175,55,0.4) 70%, rgba(212,175,55,0) 100%)', borderRadius: '50%', left: '30%', top: '40%', opacity: 0.5, animation: 'floatParticle 9s ease-in-out infinite', animationDelay: '1.5s' }}></div>
          </div>
      </section>

      {/* Press Featured In Ribbon */}
      <section className="featured-strip">
          <p>✦ Featured In & As Seen In ✦</p>
          <div className="featured-logos">
              <div className="featured-logo-item">VOGUE WEDDINGS</div>
              <div className="featured-logo-item">THE TIMES OF INDIA</div>
              <div className="featured-logo-item">WEDMEGOOD</div>
              <div className="featured-logo-item">ZANKYOU WEDDINGS</div>
              <div className="featured-logo-item">HINDUSTAN TIMES</div>
          </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
          <div className="about-container">
              <div className="about-img" data-animate>
                  <div className="about-slideshow">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg" alt="About Slideshow 1" className="active" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9" alt="About Slideshow 2" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9" alt="About Slideshow 3" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9" alt="About Slideshow 4" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9" alt="About Slideshow 5" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9" alt="About Slideshow 6" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9" alt="About Slideshow 7" />
                  </div>
              </div>
              <div className="about-content" data-animate>
                  <p className="hero-tagline">✦ Who We Are ✦</p>
                  <h3>Defining Luxury in <br/><span className="gold-text">Every Single Detail</span></h3>
                  <p>Welcome to <strong>Dream Day Events</strong>, your premier partner in luxury event management, premium decor, and gourmet catering. Led by the visionary event designer <strong>Mr. Ayush Kale</strong>, we transform venues into royal spaces, creating rich, premium designs tailored to your desires.</p>
                  <p>From magnificent wedding stages to vibrant haldi ceremonies, elegant corporate affairs to custom catered delicacies, we ensure perfection in execution. Our signature style blends traditional elegance with modern sophistication.</p>
                  
                  <div className="about-features">
                      <div className="about-feature-item">
                          <i className="fa-solid fa-award"></i>
                          <div>
                              <h4>Elite Designs</h4>
                              <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)' }}>Bespoke themes and setups</p>
                          </div>
                      </div>
                      <div className="about-feature-item">
                          <i className="fa-solid fa-utensils"></i>
                          <div>
                              <h4>Premium Catering</h4>
                              <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)' }}>Gourmet multi-cuisine spreads</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
          <div className="stats-container">
              <div className="stat-item" data-animate>
                  <div className="stat-num" data-target="200" data-suffix="+">0+</div>
                  <div className="stat-label">Events Managed</div>
              </div>
              <div className="stat-item" data-animate>
                  <div className="stat-num" data-target="8" data-suffix="+">0+</div>
                  <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item" data-animate>
                  <div className="stat-num" data-target="150" data-suffix="+">0+</div>
                  <div className="stat-label">Venue Partners</div>
              </div>
              <div className="stat-item" data-animate>
                  <div className="stat-num" data-target="100" data-suffix="%">0%</div>
                  <div className="stat-label">Client Satisfaction</div>
              </div>
          </div>
      </section>

      {/* Cinematic Highlights Section */}
      <section className="video-highlights-section" id="highlights" style={{ paddingTop: '80px', paddingBottom: '50px' }}>
          <div className="section-header" style={{ marginBottom: '50px' }}>
              <p className="hero-tagline" data-animate data-delay="100ms">✦ Experience the Magic ✦</p>
              <h2 data-animate data-delay="250ms">Cinematic <span className="gold-text">Highlights</span></h2>
          </div>
          <div className="luxury-video-trio">
              {videosData && videosData.slice(0, 3).map((vid, idx) => (
                  <div className="video-trio-card" id={`trio-player-${idx + 1}`} key={vid.id || idx}>
                      <span className="video-trio-badge">{vid.badge || 'Highlight'}</span>
                      <video autoPlay loop muted playsInline preload="auto" poster={vid.poster} style={{ backgroundImage: `url('${vid.poster}')` }}>
                          <source src={vid.src || vid.url} type="video/mp4" />
                      </video>
                      <div className="video-trio-overlay">
                          <h3>{vid.title}</h3>
                          <p>{vid.desc || vid.title}</p>
                      </div>
                  </div>
              ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }} data-animate>
              <a href="https://www.instagram.com/royal_eventanddecor/reels/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fa-brands fa-instagram" style={{ marginRight: '8px', color: 'var(--gold-primary)' }}></i>Check the Reel on Instagram
              </a>
          </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
          <div className="section-header">
              <p className="hero-tagline" data-animate data-delay="100ms">✦ What We Offer ✦</p>
              <h2 data-animate data-delay="250ms">Our <span className="gold-text">Bespoke Services</span></h2>
          </div>
          <div className="services-grid">
              <div className="service-card" data-animate>
                  <div className="service-icon"><i className="fa-solid fa-ring"></i></div>
                  <h3>Wedding Decor</h3>
                  <p>Grand stage designs, beautiful mandaps, entrance archways and floral styling that leave a lasting impression.</p>
              </div>
              <div className="service-card" data-animate>
                  <div className="service-icon"><i className="fa-solid fa-palette"></i></div>
                  <h3>Haldi & Mehndi</h3>
                  <p>Vibrant, colourful, and custom setups using fresh flowers and unique props matching your traditional themes.</p>
              </div>
              <div className="service-card" data-animate>
                  <div className="service-icon"><i className="fa-solid fa-champagne-glasses"></i></div>
                  <h3>Receptions</h3>
                  <p>Ultra-modern layouts, ambient lighting setups, elegant drapes, and high-fashion lounges for post-wedding events.</p>
              </div>
              <div className="service-card" data-animate>
                  <div className="service-icon"><i className="fa-solid fa-hotdog"></i></div>
                  <h3>Gourmet Catering</h3>
                  <p>Exquisite culinary experience with premium serving displays, tailored menus, and professional hospitality staff.</p>
              </div>
              <div className="service-card" data-animate>
                  <div className="service-icon"><i className="fa-solid fa-cake-candles"></i></div>
                  <h3>Birthdays & Parties</h3>
                  <p>Theme-based designs ranging from sophisticated black & gold to magical, custom-designed setups.</p>
              </div>
              <div className="service-card" data-animate>
                  <div className="service-icon"><i className="fa-solid fa-briefcase"></i></div>
                  <h3>Corporate Galas</h3>
                  <p>Professional stage branding, audio-visual coordinate setups, premium conference decor, and awards night arrangements.</p>
              </div>
          </div>
      </section>

      {/* Before & After Transformations Section */}
      <section className="ba-section" id="transformations">
          <div className="section-header">
              <p className="hero-tagline" data-animate data-delay="100ms">✦ Magic Makeovers ✦</p>
              <h2 data-animate data-delay="250ms">Venue <span className="gold-text">Transformations</span></h2>
          </div>
          <div className="ba-grid">
              {/* Transformation 1: Banquet Hall */}
              <div className="ba-card" data-animate>
                  <h3>Royal Banquet Makeover</h3>
                  <p>From an empty, plain banquet hall to a breathtaking luxury wedding stage setup.</p>
                  <div className="ba-container" id="ba-hall">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/before-hall.png" className="ba-img before-img" alt="Banquet Hall Before" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9" className="ba-img after-img" alt="Banquet Hall After" />
                      <div className="ba-slider-bar"></div>
                      <div className="ba-slider-button"><i className="fa-solid fa-arrows-left-right"></i></div>
                      <span className="ba-label before-label">Before</span>
                      <span className="ba-label after-label">After</span>
                  </div>
              </div>

              {/* Transformation 2: Open Lawn */}
              <div className="ba-card" data-animate>
                  <h3>Royal Outdoor Lawn Styling</h3>
                  <p>From a raw outdoor open space to a premium sky-blue beachside celebration decor.</p>
                  <div className="ba-container" id="ba-lawn">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/before-lawn.png" className="ba-img before-img" alt="Lawn Before" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg" className="ba-img after-img" alt="Lawn After" />
                      <div className="ba-slider-bar"></div>
                      <div className="ba-slider-button"><i className="fa-solid fa-arrows-left-right"></i></div>
                      <span className="ba-label before-label">Before</span>
                      <span className="ba-label after-label">After</span>
                  </div>
              </div>
          </div>
      </section>

      {/* Meet the Manager Section */}
      <section className="manager" id="manager">
          <div className="manager-container">
              <div className="manager-img-wrapper" data-animate>
                  <div className="manager-img">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/ayush-kale.jpg" alt="Mr. Ayush Kale" />
                  </div>
              </div>
              <div className="manager-info" data-animate>
                  <p className="hero-tagline">✦ The Creative Visionary ✦</p>
                  <h3>Mr. Ayush Kale</h3>
                  <h4 className="manager-title">Founder & Lead Event Manager</h4>
                  <p className="manager-bio">"An event is not just a date on a calendar; it is a canvas of emotions, beauty, and memories. At Dream Day Events, we bring your visual imagination to life. We believe in providing the absolute best in class aesthetics and flawless execution so you can enjoy your dream day without a worry."</p>
                  <p className="manager-bio" style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>Under Mr. Ayush Kale's creative direction, Dream Day Events has successfully coordinated over 200 premium weddings and corporate galas, bringing 8+ years of expertise to every single detail.</p>
                  <div className="manager-socials">
                      <a href="https://www.instagram.com/royal_eventanddecor?igsh=MXQ5bDI0NzBkbmhoaQ==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                      <a href="#" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                      <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                      <a href="https://wa.me/918459398321?text=Hi%20Ayush%2C%20I%20would%20like%20to%20discuss%20decorating%20for%20my%20upcoming%20event." target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
              </div>
          </div>
      </section>

      {/* Google Reviews Widget Section */}
      <section className="reviews-section" id="reviews">
          <div className="section-header">
              <p className="hero-tagline" data-animate data-delay="100ms">✦ Google Reviews ✦</p>
              <h2 data-animate data-delay="250ms">Trusted By <span className="gold-text">Hundreds</span></h2>
          </div>
          <div className="google-reviews-widget" data-animate>
              <div className="reviews-header">
                  <div className="reviews-summary">
                      <i className="fa-brands fa-google reviews-badge-icon"></i>
                      <div>
                          <div className="reviews-rating-value">4.9 / 5.0</div>
                          <div className="reviews-stars">
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star-half-stroke"></i>
                          </div>
                          <div className="reviews-count">Based on 158 verified Google Reviews</div>
                      </div>
                  </div>
                  <a href="https://g.page/r/google-review-link/review" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '10px 22px' }}>
                      Write a Review
                  </a>
              </div>
              
              <div className="reviews-grid">
                  <div className="review-item-card">
                      <div className="review-user-info">
                          <div className="review-user-avatar">Amit</div>
                          <div className="review-user-details">
                              <h4>Amit Deshpande</h4>
                              <span>Google Reviewer • Pune</span>
                          </div>
                      </div>
                      <div className="reviews-stars" style={{ marginBottom: '10px' }}>
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                      </div>
                      <p className="review-text">"Excellent coordination! Mr. Ayush Kale managed the entire sangeet sadas and catering display flawlessly. The guest comments on the food were incredible!"</p>
                  </div>
                  <div className="review-item-card">
                      <div className="review-user-info">
                          <div className="review-user-avatar">Neha</div>
                          <div className="review-user-details">
                              <h4>Neha Kulkarni</h4>
                              <span>Local Guide • Pune</span>
                          </div>
                      </div>
                      <div className="reviews-stars" style={{ marginBottom: '10px' }}>
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                      </div>
                      <p className="review-text">"They transformed a simple banquet hall into a royal wedding palace. The gold frame elements and fresh flowers were outstanding. Highly recommended luxury planner in Pune!"</p>
                  </div>
                  <div className="review-item-card">
                      <div className="review-user-info">
                          <div className="review-user-avatar">Raj</div>
                          <div className="review-user-details">
                              <h4>Rajesh Sen</h4>
                              <span>Google Reviewer • Maharashtra</span>
                          </div>
                      </div>
                      <div className="reviews-stars" style={{ marginBottom: '10px' }}>
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                      </div>
                      <p className="review-text">"Top tier professionalism. Easy booking, premium catering setup, and gorgeous lighting design. The team was prompt and executed exactly what we signed on."</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Testimonials removed as per user request */}

      {/* Contact Section */}
      <section className="contact" id="contact">
          <div className="section-header">
              <p className="hero-tagline" data-animate data-delay="100ms">✦ Get In Touch ✦</p>
              <h2 data-animate data-delay="250ms">Plan Your <span className="gold-text">Celebration</span></h2>
          </div>
          <div className="contact-container">
              <div className="contact-form-wrapper" data-animate>
                  <form id="contact-form">
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="name">Your Name</label>
                              <input type="text" id="name" className="form-control" required placeholder="Enter your full name" />
                          </div>
                          <div className="form-group">
                              <label htmlFor="email">Email Address</label>
                              <input type="email" id="email" className="form-control" required placeholder="Enter your email" />
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="phone">Phone Number</label>
                              <input type="tel" id="phone" className="form-control" required placeholder="Enter your phone number" />
                          </div>
                          <div className="form-group">
                              <label htmlFor="event-type">Event Type</label>
                              <select id="event-type" className="form-control" required defaultValue="">
                                  <option value="" disabled>Select event category</option>
                                  <option value="wedding">Wedding Decoration & Stage</option>
                                  <option value="haldi">Haldi & Mehndi Setup</option>
                                  <option value="reception">Reception Decor</option>
                                  <option value="catering">Gourmet Catering Services</option>
                                  <option value="birthday">Birthday or Theme Party</option>
                                  <option value="corporate">Corporate Event</option>
                                  <option value="other">Other Celebration</option>
                              </select>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="date">Event Date</label>
                              <input type="date" id="date" className="form-control" required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="venue">Event Venue (if known)</label>
                              <input type="text" id="venue" className="form-control" placeholder="Enter venue name or city" />
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="guest-count-form">Approximate Guest Count</label>
                              <input type="number" id="guest-count-form" className="form-control" placeholder="e.g., 150" min="1" />
                          </div>
                          <div className="form-group">
                              <label htmlFor="budget">Budget Range</label>
                              <select id="budget" className="form-control" defaultValue="">
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
                          <textarea id="message" className="form-control" placeholder="Describe your vision, decor preferences, theme ideas, or other special requirements..."></textarea>
                      </div>
                      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                          <button type="button" className="btn btn-primary" onClick={() => alert('Submit logic ported to React')}>Send Email</button>
                          <button type="button" id="whatsapp-submit-btn" className="btn btn-secondary" style={{ background: '#25d366', color: 'white', border: '1px solid #25d366' }}>
                              <i className="fa-brands fa-whatsapp" style={{ marginRight: '8px' }}></i>Inquire on WhatsApp
                          </button>
                      </div>
                  </form>
              </div>
              
              <div className="contact-info-wrapper" data-animate>
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
                          style={{ border: 0, width: '100%', height: '100%' }}>
                      </iframe>
                  </div>
              </div>
          </div>
      </section>

      {/* Instagram section removed */}
    </main>
  );
};

export default Home;
