import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useData } from '../context/DataContext';

const Packages = () => {
  useScrollAnimation();
  const { packagesData } = useData();

  const defaultPrices = {
    royalStage: 80000,
    entranceArch: 30000,
    saffronMandap: 50000,
    haldiSwing: 20000,
    ledWall: 40000,
    ambientLight: 25000,
    cateringToggle: 800 // per guest
  };

  const prices = { ...defaultPrices, ...(packagesData || {}) };

  return (
    <main>
      {/* Packages Hero Section */}
      <header className="portfolio-hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(30, 80, 150, 0.2) 0%, rgba(10, 25, 60, 0.6) 100%), url('https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 5% 60px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <p className="hero-tagline" data-animate data-delay="100ms">✦ Pricing & Tiers ✦</p>
          <h2 data-animate data-delay="250ms">Luxury <span className="gold-text">Event Packages</span></h2>
          <p data-animate data-delay="400ms" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Curated design packages tailored for your dream celebrations, stages, and premium feasts.</p>
      </header>

      {/* Pricing Packages Section */}
      <section className="packages-section" style={{ paddingTop: '50px' }}>
          <div className="packages-grid" data-animate data-stagger>
              {/* Package 1 */}
              <div className="package-card" data-animate>
                  <div className="package-header">
                      <span className="package-tag">Premium Choice</span>
                      <h3>Royal Elite Wedding Stage</h3>
                      <div className="package-price">
                          <span className="currency">₹</span>
                          <span className="amount">{(prices.royalStage + prices.entranceArch + prices.ledWall).toLocaleString('en-IN')}</span>
                          <span className="period">Starting</span>
                      </div>
                  </div>
                  <ul className="package-features">
                      <li><i className="fa-solid fa-check"></i> Grand 40ft Stage Backdrop Setup</li>
                      <li><i className="fa-solid fa-check"></i> Fresh and Silk Floral Arches</li>
                      <li><i className="fa-solid fa-check"></i> Royal Maharaja Couch / Sofa Seating</li>
                      <li><i className="fa-solid fa-check"></i> Walkway Red Carpet & Light Pillars</li>
                      <li><i className="fa-solid fa-check"></i> Elegant Selfie Photo Booth Spot</li>
                      <li><i className="fa-solid fa-check"></i> Custom 3D Monogram & Cold Pyro Entry</li>
                      <li><i className="fa-solid fa-check"></i> Complete Ambient LED Venue Lighting</li>
                  </ul>
                  <div className="package-footer">
                      <a href="https://wa.me/918459398321?text=Hi%21%20I%20am%20interested%20in%20your%20*Royal%20Elite%20Wedding%20Stage%20Package*%20%28Starting%20at%20%E2%82%B91%2C50%2C000%29.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn">Book on WhatsApp</a>
                  </div>
              </div>

              {/* Package 2 */}
              <div className="package-card featured-card" data-animate>
                  <div className="package-header">
                      <span className="package-tag" style={{ background: 'var(--gold-gradient)', color: '#070d1e' }}>Most Popular</span>
                      <h3>Vibrant Shahnaz Haldi</h3>
                      <div className="package-price">
                          <span className="currency">₹</span>
                          <span className="amount">{(prices.haldiSwing + 40000).toLocaleString('en-IN')}</span>
                          <span className="period">Starting</span>
                      </div>
                  </div>
                  <ul className="package-features">
                      <li><i className="fa-solid fa-check"></i> Traditional Yellow/Pink Silk Draping</li>
                      <li><i className="fa-solid fa-check"></i> Decorated Wooden swing Setup</li>
                      <li><i className="fa-solid fa-check"></i> Cascading Heavy Marigold Garlands</li>
                      <li><i className="fa-solid fa-check"></i> Brass Vessels & Ceremonial Urali Bowl</li>
                      <li><i className="fa-solid fa-check"></i> Festive Guest Seating Cushions & Mats</li>
                      <li><i className="fa-solid fa-check"></i> Sound System for Traditional Sangeet</li>
                      <li><i className="fa-solid fa-check"></i> Haldi Photo backdrop Props</li>
                  </ul>
                  <div className="package-footer">
                      <a href="https://wa.me/918459398321?text=Hi%21%20I%20am%20interested%20in%20your%20*Vibrant%20Shahnaz%20Haldi%20Package*%20%28Starting%20at%20%E2%82%B960%2C000%29.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn" style={{ background: 'var(--gold-gradient)', color: '#070d1e' }}>Book on WhatsApp</a>
                  </div>
              </div>

              {/* Package 3 */}
              <div className="package-card" data-animate>
                  <div className="package-header">
                      <span className="package-tag">Corporate Elite</span>
                      <h3>Imperial Gala Stage</h3>
                      <div className="package-price">
                          <span className="currency">₹</span>
                          <span className="amount">{(prices.royalStage + prices.ledWall).toLocaleString('en-IN')}</span>
                          <span className="period">Starting</span>
                      </div>
                  </div>
                  <ul className="package-features">
                      <li><i className="fa-solid fa-check"></i> Modern Panel Staging & Matte Flooring</li>
                      <li><i className="fa-solid fa-check"></i> High-Def LED Wall Backdrop Integration</li>
                      <li><i className="fa-solid fa-check"></i> Professional Truss and Spotlight Rigs</li>
                      <li><i className="fa-solid fa-check"></i> Elite VIP Seating Sofa Lounge Setup</li>
                      <li><i className="fa-solid fa-check"></i> Registration Counter & Media Wall Decor</li>
                      <li><i className="fa-solid fa-check"></i> Luxury Centerpieces for Banquet Tables</li>
                      <li><i className="fa-solid fa-check"></i> Sound System & Wireless Podium Mics</li>
                  </ul>
                  <div className="package-footer">
                      <a href="https://wa.me/918459398321?text=Hi%21%20I%20am%20interested%20in%20your%20*Imperial%20Gala%20Corporate%20Package*%20%28Starting%20at%20%E2%82%B91%2C20%2C000%29.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn">Book on WhatsApp</a>
                  </div>
              </div>

              {/* Package 4 */}
              <div className="package-card" data-animate>
                  <div className="package-header">
                      <span className="package-tag">Gourmet Feasts</span>
                      <h3>Signature Catering</h3>
                      <div className="package-price">
                          <span className="currency">₹</span>
                          <span className="amount">{prices.cateringToggle.toLocaleString('en-IN')}</span>
                          <span className="period">Per Plate</span>
                      </div>
                  </div>
                  <ul className="package-features">
                      <li><i className="fa-solid fa-check"></i> Tailored Veg & Non-Veg Multi-Cuisine</li>
                      <li><i className="fa-solid fa-check"></i> Luxury 5-Star Buffet Layout Presentation</li>
                      <li><i className="fa-solid fa-check"></i> 3 Live Food Counters (Chat, Pasta, etc.)</li>
                      <li><i className="fa-solid fa-check"></i> Premium Mocktails & Welcome Drinks Bar</li>
                      <li><i className="fa-solid fa-check"></i> Royal Dessert Display & Hot Jalebi Counter</li>
                      <li><i className="fa-solid fa-check"></i> Professional Uniformed Service Staff</li>
                      <li><i className="fa-solid fa-check"></i> Full Banquet Table Setting & Clean Cutlery</li>
                  </ul>
                  <div className="package-footer">
                      <a href="https://wa.me/918459398321?text=Hi%21%20I%20am%20interested%20in%20your%20*Signature%20Gourmet%20Catering*%20%28Starting%20at%20%E2%82%B9800%20per%20plate%29.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn">Book on WhatsApp</a>
                  </div>
              </div>
          </div>

      </section>
    </main>
  );
};

export default Packages;
