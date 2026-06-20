import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useData } from '../context/DataContext';

const Packages = () => {
  useScrollAnimation();
  const { packagesData } = useData();

  const fallbackPackages = [
    {
      id: "pkg-1",
      tag: "Premium Choice",
      name: "Royal Elite Wedding Stage",
      price: 150000,
      period: "Starting",
      isFeatured: false,
      features: [
        "Grand 40ft Stage Backdrop Setup",
        "Fresh and Silk Floral Arches",
        "Royal Maharaja Couch / Sofa Seating",
        "Walkway Red Carpet & Light Pillars",
        "Elegant Selfie Photo Booth Spot",
        "Custom 3D Monogram & Cold Pyro Entry",
        "Complete Ambient LED Venue Lighting"
      ]
    },
    {
      id: "pkg-2",
      tag: "Most Popular",
      name: "Vibrant Shahnaz Haldi",
      price: 60000,
      period: "Starting",
      isFeatured: true,
      features: [
        "Traditional Yellow/Pink Silk Draping",
        "Decorated Wooden swing Setup",
        "Cascading Heavy Marigold Garlands",
        "Brass Vessels & Ceremonial Urali Bowl",
        "Festive Guest Seating Cushions & Mats",
        "Sound System for Traditional Sangeet",
        "Haldi Photo backdrop Props"
      ]
    },
    {
      id: "pkg-3",
      tag: "Corporate Elite",
      name: "Imperial Gala Stage",
      price: 120000,
      period: "Starting",
      isFeatured: false,
      features: [
        "Modern Panel Staging & Matte Flooring",
        "High-Def LED Wall Backdrop Integration",
        "Professional Truss and Spotlight Rigs",
        "Elite VIP Seating Sofa Lounge Setup",
        "Registration Counter & Media Wall Decor",
        "Luxury Centerpieces for Banquet Tables",
        "Sound System & Wireless Podium Mics"
      ]
    },
    {
      id: "pkg-4",
      tag: "Gourmet Feasts",
      name: "Signature Catering",
      price: 800,
      period: "Per Plate",
      isFeatured: false,
      features: [
        "Tailored Veg & Non-Veg Multi-Cuisine",
        "Luxury 5-Star Buffet Layout Presentation",
        "3 Live Food Counters (Chat, Pasta, etc.)",
        "Premium Mocktails & Welcome Drinks Bar",
        "Royal Dessert Display & Hot Jalebi Counter",
        "Professional Uniformed Service Staff",
        "Full Banquet Table Setting & Clean Cutlery"
      ]
    }
  ];

  const packagesList = Array.isArray(packagesData?.items) ? packagesData.items : fallbackPackages;

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
              {packagesList.map((pkg, index) => (
                  <div key={pkg.id || index} className={`package-card ${pkg.isFeatured ? 'featured-card' : ''}`} data-animate>
                      <div className="package-header">
                          <span className="package-tag" style={pkg.isFeatured ? { background: 'var(--gold-gradient)', color: '#070d1e' } : {}}>{pkg.tag}</span>
                          <h3>{pkg.name}</h3>
                          <div className="package-price">
                              <span className="currency">₹</span>
                              <span className="amount">{Number(pkg.price).toLocaleString('en-IN')}</span>
                              <span className="period">{pkg.period}</span>
                          </div>
                      </div>
                      <ul className="package-features">
                          {pkg.features.map((feature, i) => (
                              <li key={i}><i className="fa-solid fa-check"></i> {feature}</li>
                          ))}
                      </ul>
                      <div className="package-footer">
                          <a href={`https://wa.me/918459398321?text=${encodeURIComponent(`Hi! I am interested in your *${pkg.name}* (${pkg.period} at ₹${Number(pkg.price).toLocaleString('en-IN')}). Please share details.`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn" style={pkg.isFeatured ? { background: 'var(--gold-gradient)', color: '#070d1e' } : {}}>Book on WhatsApp</a>
                      </div>
                  </div>
              ))}
          </div>

      </section>
    </main>
  );
};

export default Packages;
