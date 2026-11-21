import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {getAuthentication, getSelf} from 'selectors/state';
import {captureAnalyticsEvent, getAnalyticsPath, initializeAnalytics, syncAnalyticsIdentity} from 'utils/analytics';

const PostHogTracker = () => {
  const authentication = useSelector(getAuthentication);
  const lastPathname = useRef<string | null>(null);
  const location = useLocation();
  const self = useSelector(getSelf);
  const userId = authentication.accessToken && self.id ? String(self.id) : null;

  useEffect(() => {
    initializeAnalytics();
    syncAnalyticsIdentity(userId);
  }, [userId]);

  useEffect(() => {
    if (lastPathname.current === location.pathname) return;
    lastPathname.current = location.pathname;
    const path = getAnalyticsPath(location.pathname);
    captureAnalyticsEvent('$pageview', {
      $current_url: `${window.location.origin}${path}`,
      $pathname: path,
      page_path: path,
    });
  }, [location.pathname]);

  return null;
};

export default PostHogTracker;
