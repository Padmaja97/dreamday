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
  videoUrl: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-2.mp4",
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

const defaultHighlights = {
  tagline: "✦ Experience the Magic ✦",
  title: "Cinematic",
  titleHighlight: "Highlights",
  videoIds: [1, 2, 3]
};

const defaultServices = [
  {
    id: 'wedding-decor',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg",
    badge: "Most Popular",

    title: "Wedding Decor",
    meta: "250+ Weddings Decorated",
    desc: "Grand stage designs, beautiful mandaps, entrance archways and floral styling that leave a lasting impression.",
    inquireText: "Wedding Decor",
    isFeatured: true
  },
  {
    id: 'haldi-mehndi',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/haldi-yellow.jpg",

    title: "Haldi & Mehndi Setup",
    meta: "180+ Ceremonies Styled",
    desc: "Vibrant, colourful, and custom setups using fresh flowers and unique props matching your traditional themes.",
    inquireText: "Haldi and Mehndi",
    isFeatured: true
  },
  {
    id: 'reception-decor',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg",

    title: "Reception Decor",
    meta: "120+ Grand Receptions",
    desc: "Ultra-modern layouts, ambient lighting setups, elegant drapes, and high-fashion lounges for post-wedding events.",
    inquireText: "Reception Decor",
    isFeatured: true
  },
  {
    id: 'gourmet-catering',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg",

    title: "Gourmet Catering",
    meta: "300+ Feasts Served",
    desc: "Exquisite culinary experience with premium serving displays, tailored menus, and professional hospitality staff.",
    inquireText: "Gourmet Catering",
    isFeatured: true
  },
  {
    id: 'themed-parties',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg",

    title: "Themed Parties & Birthdays",
    meta: "150+ Celebrations",
    desc: "Creative themed designs, balloons, and customized decor for kids' birthdays and private social gatherings.",
    inquireText: "Themed Parties",
    isFeatured: true
  },
  {
    id: 'corporate-galas',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg",

    title: "Corporate Galas",
    meta: "90+ Corporate Events",
    desc: "Professional stage branding, audio-visual coordinate setups, premium conference decor, and awards night arrangements.",
    inquireText: "Corporate Event",
    isFeatured: true
  },
  {
    id: 'photography-videography',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-17.jpg",

    title: "Photography & Videography",
    meta: "200+ Shoots Covered",
    desc: "Cinematic highlight reels, professional event photography, and drone packages capturing every single emotion.",
    inquireText: "Photography",
    isFeatured: false
  },
  {
    id: 'entertainment-music',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-18.jpg",

    title: "Entertainment & Live Music",
    meta: "100+ Live Stages",
    desc: "Live wedding bands, classical musicians, professional DJs, sound setups, and elite artist management.",
    inquireText: "Entertainment",
    isFeatured: false
  },
  {
    id: 'transport-logistics',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg",

    title: "Guest Transportation & Logistics",
    meta: "70+ Event Fleets",
    desc: "Premium guest arrivals, vehicle arrangements, route coordination, and hospitality helpdesk management.",
    inquireText: "Transport",
    isFeatured: false
  },
  {
    id: 'floral-arrangements',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg",

    title: "Floral Arrangements",
    meta: "500+ Floral Styles",
    desc: "Exotic floral setups, table centerpieces, fresh flower decorations, and customized boutique arrangements.",
    inquireText: "Floral",
    isFeatured: false
  }
];

const defaultContact = {
  phone: '+91 84593 98321',
  email: 'Ayushkale0412@gmail.com',
  address: 'Premium Plaza, Suite 402, Dharampeth, Nagpur',
  timings: 'Mon - Sun: 09:00 AM - 09:00 PM',
  instagram: 'https://www.instagram.com/royal_eventanddecor?igsh=MXQ5bDI0NzBkbmhoaQ==',
  linkedin: '#',
  whatsapp: 'https://wa.me/918459398321?text=Hi%20Dream%20Day%20Events%2C%20I%20am%20interested%20in%20your%20services.',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709462553!2d78.96288091640625!3d21.161085900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin'
};

export const DataProvider = ({ children }) => {
  const [packagesData, setPackagesData] = useState(defaultPackages);
  const [galleryData, setGalleryData] = useState(defaultGallery);
  const [managerData, setManagerData] = useState(defaultManager);
  const [videosData, setVideosData] = useState(defaultVideos);
  const [heroData, setHeroData] = useState(defaultHero);
  const [aboutData, setAboutData] = useState(defaultAbout);
  const [highlightsData, setHighlightsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [contactData, setContactData] = useState(defaultContact);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const pkgRef = doc(db, 'content', 'packages');
        const pkgSnap = await getDoc(pkgRef);
        if (!pkgSnap.exists()) await setDoc(pkgRef, defaultPackages);

        const galRef = doc(db, 'content', 'gallery');
        const galSnap = await getDoc(galRef);
        if (!galSnap.exists() || !galSnap.data().images || galSnap.data().images.length <= 6) {
          await setDoc(galRef, { images: defaultGallery });
        }
        const mgrRef = doc(db, 'content', 'manager');
        const mgrSnap = await getDoc(mgrRef);
        if (!mgrSnap.exists()) await setDoc(mgrRef, defaultManager);

        const vidRef = doc(db, 'content', 'videos');
        const vidSnap = await getDoc(vidRef);
        if (!vidSnap.exists()) await setDoc(vidRef, { videos: defaultVideos });

        const heroRef = doc(db, 'content', 'hero');
        const heroSnap = await getDoc(heroRef);
        if (!heroSnap.exists()) await setDoc(heroRef, defaultHero);

        const aboutRef = doc(db, 'content', 'about');
        const aboutSnap = await getDoc(aboutRef);
        if (!aboutSnap.exists()) await setDoc(aboutRef, defaultAbout);

        const highRef = doc(db, 'content', 'highlights');
        const highSnap = await getDoc(highRef);
        if (!highSnap.exists()) await setDoc(highRef, { tagline: "✦ Experience the Magic ✦", title: "Cinematic", titleHighlight: "Highlights", videoIds: [] });

        const srvRef = doc(db, 'content', 'services');
        const srvSnap = await getDoc(srvRef);
        if (!srvSnap.exists()) await setDoc(srvRef, { services: [] });

        const contactRef = doc(db, 'content', 'contact');
        const contactSnap = await getDoc(contactRef);
        if (!contactSnap.exists()) await setDoc(contactRef, defaultContact);
      } catch (err) {
        console.error("Error initializing Firebase data:", err);
      }
    };

    initializeData();

    const unsubPackages = onSnapshot(doc(db, 'content', 'packages'), (doc) => { if (doc.exists()) setPackagesData(doc.data()); });
    const unsubGallery = onSnapshot(doc(db, 'content', 'gallery'), (doc) => { if (doc.exists()) setGalleryData(doc.data().images || []); });
    const unsubManager = onSnapshot(doc(db, 'content', 'manager'), (doc) => { if (doc.exists()) setManagerData(doc.data()); });
    const unsubVideos = onSnapshot(doc(db, 'content', 'videos'), (doc) => { if (doc.exists()) setVideosData(doc.data().videos || []); });
    const unsubHero = onSnapshot(doc(db, 'content', 'hero'), (doc) => { if (doc.exists()) setHeroData(doc.data()); });
    const unsubAbout = onSnapshot(doc(db, 'content', 'about'), (doc) => { if (doc.exists()) setAboutData(doc.data()); });
    const unsubHighlights = onSnapshot(doc(db, 'content', 'highlights'), (doc) => { if (doc.exists()) setHighlightsData(doc.data()); });
    const unsubServices = onSnapshot(doc(db, 'content', 'services'), (doc) => { if (doc.exists()) setServicesData(doc.data().services || []); });
    const unsubContact = onSnapshot(doc(db, 'content', 'contact'), (doc) => { if (doc.exists()) setContactData(doc.data()); });
    
    const unsubTestimonials = onSnapshot(doc(db, 'content', 'testimonials'), async (docSnap) => {
      if (docSnap.exists() && docSnap.data().testimonials && docSnap.data().testimonials.length > 0) {
        setTestimonialsData(docSnap.data().testimonials);
      } else {
        const defaultTestimonials = [
          { id: 't1', name: 'Amit Deshpande', location: 'Event — Nagpur', text: 'Excellent coordination! Mr. Ayush Kale managed the entire sangeet and catering display flawlessly.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9', pfp: '/images/boy_avatar.png' },
          { id: 't2', name: 'Neha Kulkarni', location: 'Event — Nagpur', text: 'They transformed a simple banquet hall into a royal wedding palace. The gold frame elements were outstanding.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', pfp: '/images/girl_avatar.png' },
          { id: 't3', name: 'Rajesh Sen', location: 'Event — Nagpur', text: 'Top tier professionalism. Easy booking, premium catering setup, and gorgeous lighting design.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', pfp: '/images/boy_avatar.png' },
          { id: 't4', name: 'Priya Sharma', location: 'Event — Nagpur', text: 'Dream Day Events made my haldi ceremony look like a movie set. The vibrant yellow themes were perfect!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9', pfp: '/images/girl_avatar.png' },
          { id: 't5', name: 'Vikram Joshi', location: 'Event — Nagpur', text: 'Hosted our corporate gala with them. The stage branding and AV setup were top-notch.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg', pfp: '/images/boy_avatar.png' },
          { id: 't6', name: 'Sneha Patel', location: 'Event — Nagpur', text: 'The reception decor was breathtaking! Ambient lighting and elegant drapes added so much class.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg', pfp: '/images/girl_avatar.png' },
          { id: 't7', name: 'Rahul Mehta', location: 'Event — Nagpur', text: 'Gourmet catering that truly delivers on taste and presentation. Their staff was courteous.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg', pfp: '/images/boy_avatar.png' },
          { id: 't8', name: 'Anjali Verma', location: 'Event — Nagpur', text: 'From planning to execution, every detail was handled with precision.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg', pfp: '/images/girl_avatar.png' },
          { id: 't9', name: 'Siddharth Rao', location: 'Event — Nagpur', text: 'We had a themed birthday party and the balloon decor was so creative and beautifully done.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg', pfp: '/images/boy_avatar.png' },
          { id: 't10', name: 'Kavita Iyer', location: 'Event — Nagpur', text: 'Highly impressed with their outdoor lawn styling. The sky-blue decor was a hit!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg', pfp: '/images/girl_avatar.png' }
        ];
        setTestimonialsData(defaultTestimonials);
        await setDoc(doc(db, 'content', 'testimonials'), { testimonials: defaultTestimonials });
      }
    });

    setLoading(false);

    return () => {
      unsubPackages();
      unsubGallery();
      unsubManager();
      unsubVideos();
      unsubHero();
      unsubAbout();
      unsubHighlights();
      unsubServices();
      unsubTestimonials();
      unsubContact();
    };
  }, []);

  return (
    <DataContext.Provider value={{ 
      packagesData, 
      galleryData, 
      managerData, 
      heroData, 
      aboutData, 
      videosData, 
      highlightsData, 
      servicesData, 
      testimonialsData, 
      contactData,
      loading 
    }}>
      {!loading && children}
    </DataContext.Provider>
  );
};
