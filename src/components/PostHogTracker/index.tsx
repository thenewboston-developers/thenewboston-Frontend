import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {getAuthentication, getSelf} from 'selectors/state';
import {
  captureAnalyticsEvent,
  getAnalyticsPath,
  initializeAnalytics,
  isAnalyticsRedirectPath,
  syncAnalyticsIdentity,
} from 'utils/analytics';
import {captureGamePage} from 'utils/gameAnalytics';

const PostHogTracker = () => {
  const authentication = useSelector(getAuthentication);
  const lastPathname = useRef<string | null>(null);
  const location = useLocation();
  const self = useSelector(getSelf);
  const userId = authentication.accessToken && self.id ? String(self.id) : null;
  const isStaff = !!userId && !!self.is_staff;

  useEffect(() => {
    initializeAnalytics();
    syncAnalyticsIdentity(userId, isStaff);
  }, [isStaff, userId]);

  useEffect(() => {
    if (lastPathname.current === location.pathname) return;
    lastPathname.current = location.pathname;
    // Counting a path that only redirects would record a phantom page between every two real ones
    if (isAnalyticsRedirectPath(location.pathname)) return;
    const path = getAnalyticsPath(location.pathname);
    captureAnalyticsEvent('$pageview', {
      $current_url: `${window.location.origin}${path}`,
      $pathname: path,
      page_path: path,
    });
    captureGamePage(location.pathname, !!userId);
  }, [location.pathname, userId]);

  return null;
};

export default PostHogTracker;
