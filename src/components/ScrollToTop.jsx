import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Temporarily remove smooth scrolling if it exists anywhere
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Force instant scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Restore original scroll behavior slightly after
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalStyle === 'smooth' ? 'smooth' : '';
    }, 0);
  }, [pathname]);

  return null;
}
