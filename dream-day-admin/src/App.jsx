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
              <Route path="manager" element={<Manager />} />
              <Route path="inquiries" element={<Inquiries />} />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
