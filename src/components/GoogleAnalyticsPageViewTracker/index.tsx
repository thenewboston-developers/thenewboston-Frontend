import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';

import {SFC} from 'types';

const GoogleAnalyticsPageViewTracker: SFC = () => {
  const hasTrackedInitialPageView = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    if (typeof window.gtag !== 'function') {
      return;
    }

    const pagePath = `${location.pathname}${location.search}`;

    if (!hasTrackedInitialPageView.current) {
      hasTrackedInitialPageView.current = true;
      return;
    }

    window.gtag('event', 'page_view', {
      page_path: pagePath,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default GoogleAnalyticsPageViewTracker;
