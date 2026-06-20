import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollAnimation = () => {
  const location = useLocation();

  useEffect(() => {
    let animObserver;
    
    // Small delay to let the page render first
    const timeoutId = setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate], [data-stagger]');
      
      if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
          if (el.dataset.delay) {
            el.style.transitionDelay = el.dataset.delay;
          }
          if (el.dataset.duration) {
            el.style.transitionDuration = el.dataset.duration;
          }
        });

        animObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate');
              } else {
                // Remove the class when it goes out of view so it animates again next time
                entry.target.classList.remove('animate');
              }
            });
          },
          { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );
        
        animatedElements.forEach(el => animObserver.observe(el));
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (animObserver) {
        animObserver.disconnect();
      }
    };
  }, [location.pathname]);
};
