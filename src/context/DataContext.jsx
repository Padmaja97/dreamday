import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const defaultPackages = {
  items: [
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
  ]
};

const defaultGallery = [
  { id: 1, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9', title: 'Emerald Dreamcatcher Haldi', type: 'haldi' },
  { id: 2, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', title: 'Royal Monogram Stage', type: 'wedding' },
  { id: 3, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', title: 'Royal White Arch Stage', type: 'wedding' },
  { id: 4, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-4.jpg?v=9', title: 'Elysian Banquet Tablescape', type: 'wedding' },
  { id: 5, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9', title: 'Vibrant Haldi Styling', type: 'haldi' },
  { id: 6, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-6.jpg?v=9', title: 'Traditional Yellow Haldi Backdrop', type: 'haldi' },
  { id: 7, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-7.jpg?v=9', title: 'Traditional Saffron Haldi', type: 'haldi' },
  { id: 8, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-8.jpg?v=9', title: 'Outdoor Haldi Swing', type: 'haldi' },
  { id: 9, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9', title: 'Saffron Mandap Layout', type: 'wedding' },
  { id: 10, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg?v=9', title: 'Gala Banquet Table Setup', type: 'corporate' },
  { id: 11, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-11.jpg?v=9', title: 'Elite Corporate Stage Setup', type: 'corporate' },
  { id: 12, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg?v=9', title: 'Annual Business Award Night', type: 'corporate' },
  { id: 13, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-13.jpg?v=9', title: 'Royal Pink Backdrop Stage', type: 'wedding' },
  { id: 14, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg?v=9', title: 'Product Launch Backdrop', type: 'corporate' },
  { id: 15, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-15.jpg?v=9', title: 'Grand Floral Arch Stage', type: 'wedding' },
  { id: 16, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-16.jpg?v=9', title: 'Shareholders Meeting Stage', type: 'corporate' },
  { id: 17, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-17.jpg?v=9', title: 'Corporate Branding Pavilion', type: 'corporate' },
  { id: 18, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-18.jpg?v=9', title: 'Executive VIP Lounge Area', type: 'corporate' },
  { id: 19, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-19.jpg?v=9', title: 'Blue Theme Gala Banquet', type: 'corporate' },
  { id: 20, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-20.jpg?v=9', title: 'Bespoke Monogram Wedding Stage', type: 'wedding' },
  { id: 21, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', title: 'Elysian Crystal Stage', type: 'wedding' },
  { id: 22, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg?v=9', title: 'Symphony of Marigolds', type: 'haldi' },
  { id: 23, url: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-23.jpg?v=9', title: 'Royal Blue & White Stage', type: 'wedding' }
];

const defaultTestimonials = [
  { review: "Excellent coordination! Mr. Ayush Kale managed the entire sangeet sadas and catering display flawlessly. The guest comments on the food were incredible!", clientName: "Amit Deshpande", eventType: "Wedding", rating: 5 },
  { review: "They transformed a simple banquet hall into a royal wedding palace. The gold frame elements and fresh flowers were outstanding.", clientName: "Neha Kulkarni", eventType: "Reception", rating: 5 },
  { review: "Top tier professionalism. Easy booking, premium catering setup, and gorgeous lighting design. The team was prompt and executed exactly what we signed on.", clientName: "Rajesh Sen", eventType: "Corporate", rating: 5 }
];

const defaultManager = {
  name: 'Mr. Ayush Kale',
  title: 'Founder & Lead Event Manager',
  bio: "An event is not just a date on a calendar; it is a canvas of emotions, beauty, and memories. At Dream Day Events, we bring your visual imagination to life. We believe in providing the absolute best in class aesthetics and flawless execution so you can enjoy your dream day without a worry.",
  imageUrl: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/ayush-kale.jpg"
};

const defaultVideos = [
  { id: 1, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-1.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', badge: 'Wedding Teaser', title: 'Wedding Entrance Highlights', desc: 'Cinematic look at a luxury wedding entry setup with gold pillars and red flower arches.', type: 'wedding' },
  { id: 2, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-2.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', badge: 'Stage Walkthrough', title: 'Grand Reception Decor Reel', desc: 'Walkthrough showing the detailed lighting, chandeliers, and setup of a royal stage.', type: 'reception' },
  { id: 3, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-3.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9', badge: 'Haldi Highlight', title: 'Vibrant Haldi Ceremony Clip', desc: 'Fun compilation clip of our signature marigold haldi setups and props.', type: 'haldi' },
  { id: 4, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-4.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-4.jpg?v=9', badge: 'Catering Setup', title: 'Catering Buffet Setup Video', desc: 'Professional walkthrough of our premium gourmet multi-cuisine food spread and vessels.', type: 'catering' },
  { id: 5, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-5.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', badge: 'Floral Close-up', title: 'Bespoke Floral Work Highlights', desc: 'Detailed close-up on the handcrafted fresh floral decorations and flower frames.', type: 'wedding' },
  { id: 6, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-6.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', badge: 'Lawn Tour', title: 'Lawn Celebration Tour', desc: 'Drone-style walkthrough of a royal outdoor wedding lawn setup with light pillars.', type: 'wedding' },
  { id: 7, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-7.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', badge: 'Entrance Setup', title: 'Bride & Groom Entrance Setup', desc: 'A summary clip showing guest entry pathway lighting and structural decorations.', type: 'wedding' },
  { id: 8, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-8.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-8.jpg?v=9', badge: 'Swing Decor', title: 'Traditional Marigold Swing Tour', desc: 'Beautiful wooden swing setup for the haldi ceremony in action with marigolds.', type: 'haldi' },
  { id: 9, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-9.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', badge: 'Stage Timelapse', title: 'Banquet Stage Decoration', desc: 'Grand wedding decoration setup timelapse coordinated by Mr. Ayush Kale.', type: 'wedding' },
  { id: 10, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-10.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-7.jpg?v=9', badge: 'Haldi Reels', title: 'Haldi Ceremony Highlights', desc: 'Fun clips showing traditional music, yellow fabrics, and decor setups.', type: 'haldi' },
  { id: 11, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-11.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg?v=9', badge: 'Haldi Highlight', title: 'Haldi Ceremony of Eram', desc: "A beautiful cinematic reel of Eram's vibrant Haldi celebration, featuring bright pink drapes and marigolds.", type: 'haldi' },
  { id: 12, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-12.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9', badge: 'Mandap cinematic', title: 'Saffron Mandap Cinematic', desc: 'Bespoke saffron wedding mandap floral arrangements and candle decor highlights.', type: 'wedding' }
];

const defaultHero = {
  videoUrl: "/images/video-2.mp4",
  posterUrl: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg"
};

const defaultAbout = {
  images: [
    "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg",
    "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9",
    "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9",
    "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9",
    "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9",
    "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9",
    "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9"
  ],
  tagline: "✦ Who We Are ✦",
  title: "Defining Luxury in",
  titleHighlight: "Every Single Detail",
  paragraphs: [
    "Welcome to Dream Day Events, your premier partner in luxury event management, premium decor, and gourmet catering. Led by the visionary event designer Mr. Ayush Kale, we transform venues into royal spaces, creating rich, premium designs tailored to your desires.",
    "From magnificent wedding stages to vibrant haldi ceremonies, elegant corporate affairs to custom catered delicacies, we ensure perfection in execution. Our signature style blends traditional elegance with modern sophistication."
  ],
  features: [
    { icon: "fa-solid fa-award", title: "Elite Designs", desc: "Bespoke themes and setups" },
    { icon: "fa-solid fa-utensils", title: "Premium Catering", desc: "Gourmet multi-cuisine spreads" }
  ]
};

export const DataProvider = ({ children }) => {
  const [packagesData, setPackagesData] = useState(defaultPackages);
  const [galleryData, setGalleryData] = useState(defaultGallery);
  const [testimonialsData, setTestimonialsData] = useState(defaultTestimonials);
  const [managerData, setManagerData] = useState(defaultManager);
  const [videosData, setVideosData] = useState(defaultVideos);
  const [heroData, setHeroData] = useState(defaultHero);
  const [aboutData, setAboutData] = useState(defaultAbout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed default data if it doesn't exist
    const initializeData = async () => {
      try {
        const pkgRef = doc(db, 'content', 'packages');
        const pkgSnap = await getDoc(pkgRef);
        if (!pkgSnap.exists()) {
          await setDoc(pkgRef, defaultPackages);
        }

        const galRef = doc(db, 'content', 'gallery');
        const galSnap = await getDoc(galRef);
        if (!galSnap.exists() || !galSnap.data().images || galSnap.data().images.length <= 6) {
          await setDoc(galRef, { images: defaultGallery });
        }

        const mgrRef = doc(db, 'content', 'manager');
        const mgrSnap = await getDoc(mgrRef);
        if (!mgrSnap.exists()) {
          await setDoc(mgrRef, defaultManager);
        }

        const vidRef = doc(db, 'content', 'videos');
        const vidSnap = await getDoc(vidRef);
        if (!vidSnap.exists() || !vidSnap.data().videos || vidSnap.data().videos.length === 0) {
          await setDoc(vidRef, { videos: defaultVideos });
        }

        const heroRef = doc(db, 'content', 'hero');
        const heroSnap = await getDoc(heroRef);
        if (!heroSnap.exists()) {
          await setDoc(heroRef, defaultHero);
        }

        const aboutRef = doc(db, 'content', 'about');
        const aboutSnap = await getDoc(aboutRef);
        if (!aboutSnap.exists()) {
          await setDoc(aboutRef, defaultAbout);
        }
        
        // Check testimonials collection empty? (we do this inside unsubTestimonials if empty but let's seed here)
        // For simplicity, we won't seed testimonials into DB right here, instead we'll seed them via a batch or just use defaultTestimonials in context if db is empty.
      } catch (err) {
        console.error("Error initializing Firebase data:", err);
      }
    };

    initializeData();

    // Listen to live updates
    const unsubPackages = onSnapshot(doc(db, 'content', 'packages'), (doc) => {
      if (doc.exists()) {
        setPackagesData(doc.data());
      }
    });

    const unsubGallery = onSnapshot(doc(db, 'content', 'gallery'), (doc) => {
      if (doc.exists()) {
        setGalleryData(doc.data().images || []);
      }
    });

    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      const tests = [];
      snapshot.forEach(doc => {
        tests.push({ id: doc.id, ...doc.data() });
      });
      // Sort by creation date if needed
      tests.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      if (tests.length > 0) {
        setTestimonialsData(tests);
      }
    });

    const unsubManager = onSnapshot(doc(db, 'content', 'manager'), (doc) => {
      if (doc.exists()) {
        setManagerData(doc.data());
      }
    });

    const unsubVideos = onSnapshot(doc(db, 'content', 'videos'), (doc) => {
      if (doc.exists()) {
        setVideosData(doc.data().videos || []);
      }
    });

    const unsubHero = onSnapshot(doc(db, 'content', 'hero'), (doc) => {
      if (doc.exists()) {
        setHeroData(doc.data());
      }
    });

    const unsubAbout = onSnapshot(doc(db, 'content', 'about'), (doc) => {
      if (doc.exists()) {
        setAboutData(doc.data());
      }
    });

    setLoading(false);

    return () => {
      unsubPackages();
      unsubGallery();
      unsubTestimonials();
      unsubManager();
      unsubVideos();
      unsubHero();
      unsubAbout();
    };
  }, []);

  const value = {
    packagesData,
    galleryData,
    testimonialsData,
    managerData,
    videosData,
    heroData,
    aboutData,
    loading
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
