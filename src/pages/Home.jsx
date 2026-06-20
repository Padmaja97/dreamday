import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useLightbox } from '../utils/LightboxContext';
import { useData } from '../context/DataContext';

const Home = () => {
  useScrollAnimation();
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.scrollTo === 'about') {
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const { openLightbox } = useLightbox();
  const { videosData } = useData();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const horizontalSectionRef = useRef(null);
  const horizontalContentRef = useRef(null);

  // Handle pinned horizontal scroll
  useEffect(() => {
    const handleScroll = () => {
      // Only apply on desktop
      if (window.innerWidth < 992) {
        if (horizontalContentRef.current) {
           horizontalContentRef.current.style.transform = `translateX(0px)`;
        }
        return;
      }
      
      if (!horizontalSectionRef.current || !horizontalContentRef.current) return;
      const section = horizontalSectionRef.current;
      const content = horizontalContentRef.current;
      
      const rect = section.getBoundingClientRect();
      
      // The section is pinned when rect.top <= 0 and rect.bottom >= window.innerHeight
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
         // Calculate progress from 0 to 1
         const scrollableHeight = rect.height - window.innerHeight;
         const scrollProgress = Math.abs(rect.top) / scrollableHeight;
         
         // Max horizontal scroll distance
         const maxScroll = content.scrollWidth - window.innerWidth;
         content.style.transform = `translateX(-${scrollProgress * maxScroll}px)`;
      } else if (rect.top > 0) {
         content.style.transform = `translateX(0px)`;
      } else if (rect.bottom < window.innerHeight) {
         const maxScroll = content.scrollWidth - window.innerWidth;
         content.style.transform = `translateX(-${maxScroll}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct position on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const cleanupFns = [];
    
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
        cleanupFns.push(() => {
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('touchmove', onMove);
            container.removeEventListener('mousedown', onMove);
        });
    });

    return () => cleanupFns.forEach(fn => fn());
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


      {/* About Section */}
      <section className="about" id="about">
          <div className="about-container">
              <div className="about-img" data-animate="slide-left">
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
              <div className="about-content" data-animate="slide-right">
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
          <div className="stats-container" data-animate data-stagger>
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
          <div className="luxury-video-trio" data-animate data-stagger>
              {videosData && videosData.slice(0, 3).map((vid, idx) => (
                  <div className="video-trio-card" id={`trio-player-${idx + 1}`} key={vid.id || idx} onClick={() => openLightbox('video', vid.src || vid.url)} style={{ cursor: 'pointer' }}>
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

      {/* Pinned Horizontal Scrolling Services Section */}
      <section className="services-pin-wrapper" id="services" ref={horizontalSectionRef}>
          <div className="services-sticky-container">
              <div className="section-header" style={{ padding: '0 5%' }}>
                  <p className="hero-tagline" data-animate data-delay="100ms">✦ What We Offer ✦</p>
                  <h2 data-animate data-delay="250ms">Our <span className="gold-text">Bespoke Services</span></h2>
              </div>
              
              <div className="services-horizontal-track" ref={horizontalContentRef} data-animate data-stagger>
                  {/* Service 1: Wedding Decor */}
                  <div className="service-card compact-card" data-animate>
                      <div className="service-img-wrapper" style={{ height: '180px', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                          <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg" alt="Wedding Decor" className="service-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                      </div>
                      <div className="service-card-content" style={{ padding: '20px' }}>
                          <div className="service-icon" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><i className="fa-solid fa-ring"></i></div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Wedding Decor</h3>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Grand stage designs, beautiful mandaps, entrance archways and floral styling that leave a lasting impression.</p>
                      </div>
                  </div>
                  
                  {/* Service 2: Haldi & Mehndi Setup */}
                  <div className="service-card compact-card" data-animate>
                      <div className="service-img-wrapper" style={{ height: '180px', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                          <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/haldi-yellow.jpg" alt="Haldi & Mehndi Setup" className="service-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                      </div>
                      <div className="service-card-content" style={{ padding: '20px' }}>
                          <div className="service-icon" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><i className="fa-solid fa-palette"></i></div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Haldi & Mehndi</h3>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Vibrant, colourful, and custom setups using fresh flowers and unique props matching your traditional themes.</p>
                      </div>
                  </div>

                  {/* Service 3: Reception Decor */}
                  <div className="service-card compact-card" data-animate>
                      <div className="service-img-wrapper" style={{ height: '180px', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                          <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg" alt="Reception Decor" className="service-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                      </div>
                      <div className="service-card-content" style={{ padding: '20px' }}>
                          <div className="service-icon" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><i className="fa-solid fa-champagne-glasses"></i></div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Reception Decor</h3>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Ultra-modern layouts, ambient lighting setups, elegant drapes, and high-fashion lounges for post-wedding events.</p>
                      </div>
                  </div>

                  {/* Service 4: Gourmet Catering */}
                  <div className="service-card compact-card" data-animate>
                      <div className="service-img-wrapper" style={{ height: '180px', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                          <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg" alt="Gourmet Catering" className="service-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                      </div>
                      <div className="service-card-content" style={{ padding: '20px' }}>
                          <div className="service-icon" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><i className="fa-solid fa-hotdog"></i></div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Gourmet Catering</h3>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Exquisite culinary experience with premium serving displays, tailored menus, and professional hospitality staff.</p>
                      </div>
                  </div>

                  {/* Service 5: Themed Parties & Birthdays */}
                  <div className="service-card compact-card" data-animate>
                      <div className="service-img-wrapper" style={{ height: '180px', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                          <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg" alt="Themed Parties & Birthdays" className="service-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                      </div>
                      <div className="service-card-content" style={{ padding: '20px' }}>
                          <div className="service-icon" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><i className="fa-solid fa-cake-candles"></i></div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Birthdays & Parties</h3>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Creative themed designs, balloons, and customized decor for kids' birthdays and private social gatherings.</p>
                      </div>
                  </div>

                  {/* Service 6: Corporate Galas */}
                  <div className="service-card compact-card" data-animate>
                      <div className="service-img-wrapper" style={{ height: '180px', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                          <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg" alt="Corporate Galas" className="service-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                      </div>
                      <div className="service-card-content" style={{ padding: '20px' }}>
                          <div className="service-icon" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><i className="fa-solid fa-briefcase"></i></div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Corporate Galas</h3>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Professional stage branding, audio-visual coordinate setups, premium conference decor, and awards night arrangements.</p>
                      </div>
                  </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '20px' }} data-animate>
                  <Link to="/services" className="btn btn-secondary">View All Services</Link>
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
              <div className="ba-card" data-animate="scale-up">
                  <h3>Royal Banquet Makeover</h3>
                  <p>From an empty, plain banquet hall to a breathtaking luxury wedding stage setup.</p>
                  <div className="ba-container" id="ba-hall">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/before-hall.png" className="ba-img after-img" alt="Banquet Hall Before" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9" className="ba-img before-img" alt="Banquet Hall After" />
                      <div className="ba-slider-bar"></div>
                      <div className="ba-slider-button"><i className="fa-solid fa-arrows-left-right"></i></div>
                      <span className="ba-label before-label">Before</span>
                      <span className="ba-label after-label">After</span>
                  </div>
              </div>

              {/* Transformation 2: Open Lawn */}
              <div className="ba-card" data-animate="scale-up">
                  <h3>Royal Outdoor Lawn Styling</h3>
                  <p>From a raw outdoor open space to a premium sky-blue beachside celebration decor.</p>
                  <div className="ba-container" id="ba-lawn">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/before-lawn.png" className="ba-img after-img" alt="Lawn Before" />
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg" className="ba-img before-img" alt="Lawn After" />
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
              <div className="manager-img-wrapper" data-animate="blur-in">
                  <div className="manager-img">
                      <img src="https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/ayush-kale.jpg" alt="Mr. Ayush Kale" />
                  </div>
              </div>
              <div className="manager-info" data-animate="slide-right">
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

      {/* Testimonials Marquee Section */}
      <section className="testimonials-section" id="reviews" style={{ overflow: 'hidden', padding: '100px 0' }}>
          <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="hero-tagline" data-animate data-delay="100ms">✦ Testimonials ✦</p>
              <h2 data-animate data-delay="250ms">Feedback From <span className="gold-text">Our Clients</span></h2>
              <p data-animate data-delay="400ms" style={{ maxWidth: '600px', margin: '15px auto 35px auto', color: 'var(--text-secondary)', fontSize: '1.1rem', textAlign: 'center' }}>
                 Real stories from couples and companies who trusted us with their most cherished moments.
              </p>
              <div data-animate data-delay="550ms" style={{ 
                  display: 'inline-flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '15px', 
                  padding: '12px 35px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50px',
                  background: 'rgba(212, 175, 55, 0.08)'
              }}>
                  <div className="reviews-stars" style={{ color: 'var(--gold-primary)', fontSize: '1.1rem', display: 'flex', gap: '3px' }}>
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                  </div>
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>5.0</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>· 200+ happy clients</span>
              </div>
          </div>

          <div className="marquee-container" style={{ marginTop: '50px', position: 'relative' }}>
              {/* Fade gradients for smooth entering/exiting of marquee */}
              <div className="marquee-fade marquee-fade-left" style={{ position: 'absolute', top: 0, left: 0, width: '150px', height: '100%', zIndex: 2, pointerEvents: 'none' }}></div>
              <div className="marquee-fade marquee-fade-right" style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '100%', zIndex: 2, pointerEvents: 'none' }}></div>
              
              <div className="marquee-content">
                  {[
                      { name: 'Amit Deshpande', gender: 'boy', text: 'Excellent coordination! Mr. Ayush Kale managed the entire sangeet and catering display flawlessly. The guest comments on the food were incredible!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9' },
                      { name: 'Neha Kulkarni', gender: 'girl', text: 'They transformed a simple banquet hall into a royal wedding palace. The gold frame elements and fresh flowers were outstanding. Highly recommended luxury planner in Pune!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9' },
                      { name: 'Rajesh Sen', gender: 'boy', text: 'Top tier professionalism. Easy booking, premium catering setup, and gorgeous lighting design. The team was prompt and executed exactly what we signed on.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9' },
                      { name: 'Priya Sharma', gender: 'girl', text: 'Dream Day Events made my haldi ceremony look like a movie set. The vibrant yellow themes and floral props were perfect!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9' },
                      { name: 'Vikram Joshi', gender: 'boy', text: 'Hosted our corporate gala with them. The stage branding and AV setup were top-notch. Our executives were extremely impressed.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg' },
                      { name: 'Sneha Patel', gender: 'girl', text: 'The reception decor was breathtaking! Ambient lighting, elegant drapes, and the lounge setup added so much class to our night.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg' },
                      { name: 'Rahul Mehta', gender: 'boy', text: 'Gourmet catering that truly delivers on taste and presentation. Their hospitality staff was courteous and professional.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg' },
                      { name: 'Anjali Verma', gender: 'girl', text: 'From planning to execution, every detail was handled with precision. Thank you for making our dream day come true.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg' },
                      { name: 'Siddharth Rao', gender: 'boy', text: 'We had a themed birthday party for our daughter and the balloon decor was so creative and beautifully done. She loved it!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg' },
                      { name: 'Kavita Iyer', gender: 'girl', text: 'Highly impressed with their outdoor lawn styling. The beachside sky-blue decor for our anniversary was a hit among guests.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg' },
                      // Duplicate for seamless scroll
                      { name: 'Amit Deshpande', gender: 'boy', text: 'Excellent coordination! Mr. Ayush Kale managed the entire sangeet and catering display flawlessly. The guest comments on the food were incredible!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9' },
                      { name: 'Neha Kulkarni', gender: 'girl', text: 'They transformed a simple banquet hall into a royal wedding palace. The gold frame elements and fresh flowers were outstanding. Highly recommended luxury planner in Pune!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9' },
                      { name: 'Rajesh Sen', gender: 'boy', text: 'Top tier professionalism. Easy booking, premium catering setup, and gorgeous lighting design. The team was prompt and executed exactly what we signed on.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9' },
                      { name: 'Priya Sharma', gender: 'girl', text: 'Dream Day Events made my haldi ceremony look like a movie set. The vibrant yellow themes and floral props were perfect!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9' },
                      { name: 'Vikram Joshi', gender: 'boy', text: 'Hosted our corporate gala with them. The stage branding and AV setup were top-notch. Our executives were extremely impressed.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg' },
                      { name: 'Sneha Patel', gender: 'girl', text: 'The reception decor was breathtaking! Ambient lighting, elegant drapes, and the lounge setup added so much class to our night.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg' },
                      { name: 'Rahul Mehta', gender: 'boy', text: 'Gourmet catering that truly delivers on taste and presentation. Their hospitality staff was courteous and professional.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg' },
                      { name: 'Anjali Verma', gender: 'girl', text: 'From planning to execution, every detail was handled with precision. Thank you for making our dream day come true.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg' },
                      { name: 'Siddharth Rao', gender: 'boy', text: 'We had a themed birthday party for our daughter and the balloon decor was so creative and beautifully done. She loved it!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg' },
                      { name: 'Kavita Iyer', gender: 'girl', text: 'Highly impressed with their outdoor lawn styling. The beachside sky-blue decor for our anniversary was a hit among guests.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg' }
                  ].map((r, idx) => (
                      <div className="review-card" key={idx} style={{
                          display: 'inline-flex',
                          flexDirection: 'column',
                          width: '380px',
                          margin: '0 15px',
                          background: 'var(--bg-card)',
                          borderRadius: '15px',
                          border: '1px solid var(--border-color)',
                          whiteSpace: 'normal',
                          flexShrink: 0,
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                          overflow: 'hidden',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)'
                      }}>
                          {/* Image Top with Fade Gradient */}
                          <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                              <img src={r.img} alt={`${r.name}'s event`} style={{ width: '100%', height: '100%', objectFit: 'cover', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }} />
                          </div>

                          <div style={{ padding: '0 25px 25px 25px', display: 'flex', flexDirection: 'column', flexGrow: 1, zIndex: 1, marginTop: '-20px' }}>
                              {/* Stars */}
                              <div className="reviews-stars" style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '15px' }}>
                                  <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i>
                              </div>

                              {/* Review Text */}
                              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '30px', flexGrow: 1, lineHeight: '1.6' }}>
                                  {r.text}
                              </p>

                              {/* Bottom Profile & Badge */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <div style={{ position: 'relative', flexShrink: 0, width: '50px', height: '50px' }}>
                                          <img 
                                            src={r.gender === 'boy' ? '/images/boy_avatar.png' : '/images/girl_avatar.png'} 
                                            alt={`${r.name} profile`} 
                                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', background: '#0d1e3d', border: '1px solid var(--border-color)' }} 
                                          />
                                          {/* Little overlap icon on avatar */}
                                          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', background: 'var(--gold-primary)', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid var(--bg-secondary)` }}>
                                              <i className="fa-solid fa-check" style={{ color: '#070d1e', fontSize: '0.55rem', fontWeight: 'bold' }}></i>
                                          </div>
                                      </div>
                                      <div>
                                          <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>{r.name}</h4>
                                          <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Event — Pune</span>
                                      </div>
                                  </div>

                                  {/* Verified Badge */}
                                  <div style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold-light)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid var(--border-color)' }}>
                                      <i className="fa-solid fa-star" style={{ color: 'var(--gold-primary)', fontSize: '0.65rem' }}></i> Verified
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact" style={{ padding: '80px 5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p className="hero-tagline" data-animate data-delay="100ms">✦ Get In Touch ✦</p>
              <h2 data-animate data-delay="250ms">Plan Your <span className="gold-text">Celebration</span></h2>
              <p data-animate data-delay="300ms" style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Fill out the form below and we'll get back to you shortly.</p>
          </div>
          
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
              <form id="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  {/* Row 1 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Full Name <span style={{color: '#ef4444'}}>*</span></label>
                          <input type="text" id="name" required placeholder="John Smith" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Phone <span style={{color: '#ef4444'}}>*</span></label>
                          <input type="tel" id="phone" required placeholder="+91 98765 43210" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
                      </div>
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Event type <span style={{color: '#ef4444'}}>*</span></label>
                          <select id="event-type" required defaultValue="" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}>
                              <option value="" disabled>Select type</option>
                              <option value="wedding">Wedding Decoration</option>
                              <option value="corporate">Corporate Event</option>
                              <option value="other">Other</option>
                          </select>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Event date <span style={{color: '#ef4444'}}>*</span></label>
                          <input type="date" id="date" required style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-secondary)', fontSize: '1rem', outline: 'none', colorScheme: 'dark' }} />
                      </div>
                  </div>

                  {/* Row 3 */}
                  <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Preferred Location <span style={{color: '#ef4444'}}>*</span></label>
                      <input type="text" id="location" required placeholder="Enter your preferred event location" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
                  </div>

                  {/* Row 4 */}
                  <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Message <span style={{color: '#ef4444'}}>*</span></label>
                      <textarea id="message" required placeholder="Hello, I'm interested in event management services by The Bliss Events..." style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', height: '140px', resize: 'vertical', fontSize: '1rem', outline: 'none' }}></textarea>
                  </div>
                  
                  {/* Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '10px' }}>
                      <button type="button" className="btn" onClick={() => alert('Submit logic ported to React')} style={{ background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '16px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                          Submit inquiry
                      </button>
                      <button type="button" id="whatsapp-submit-btn" className="btn" style={{ background: 'transparent', color: '#25d366', border: '2px solid #25d366', padding: '16px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' }} onMouseOver={e => {e.currentTarget.style.background = '#25d366'; e.currentTarget.style.color = '#fff';}} onMouseOut={e => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#25d366';}}>
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

      {/* Instagram section removed */}
    </main>
  );
};

export default Home;
