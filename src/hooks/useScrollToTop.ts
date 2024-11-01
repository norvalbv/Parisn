import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top of the page unless it's navigating to an anchor tag.
const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default useScrollToTop;
