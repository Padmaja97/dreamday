import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './hooks/useToast';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Prices from './pages/Prices';
import Gallery from './pages/Gallery';
import Manager from './pages/Manager';
import Videos from './pages/Videos';
import Inquiries from './pages/Inquiries';
import HeroSettings from './pages/HeroSettings';
import AboutSettings from './pages/AboutSettings';
import HighlightsSettings from './pages/HighlightsSettings';
import ServicesSettings from './pages/ServicesSettings';
import TestimonialsSettings from './pages/TestimonialsSettings';
import ContactSettings from './pages/ContactSettings';
import { Agentation } from 'agentation';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="prices" element={<Prices />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="videos" element={<Videos />} />
              <Route path="hero" element={<HeroSettings />} />
              <Route path="about" element={<AboutSettings />} />
              <Route path="highlights" element={<HighlightsSettings />} />
              <Route path="services" element={<ServicesSettings />} />
              <Route path="testimonials" element={<TestimonialsSettings />} />
              <Route path="contact" element={<ContactSettings />} />
              <Route path="manager" element={<Manager />} />
              <Route path="inquiries" element={<Inquiries />} />
            </Route>
          </Routes>
          {window.location.hostname === 'localhost' && <Agentation />}
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
