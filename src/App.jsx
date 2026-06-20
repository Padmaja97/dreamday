import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Agentation } from 'agentation';
import { seedDefaultData } from './utils/seedData';
import { LightboxProvider } from './utils/LightboxContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import GlobalDecorations from './components/GlobalDecorations';

// Import Pages (will be created next)
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Inquire from './pages/Inquire';
import Manager from './pages/Manager';
import Blog from './pages/Blog';
import { DataProvider } from './context/DataContext';

function App() {
  useEffect(() => {
    // Initialize local storage data once on app load
    seedDefaultData();
  }, []);

  return (
    <DataProvider>
      <LightboxProvider>
        <Router>
          <GlobalDecorations />
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/inquire" element={<Inquire />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
          <Footer />
          <Agentation />
        </Router>
      </LightboxProvider>
    </DataProvider>
  );
}

export default App;
