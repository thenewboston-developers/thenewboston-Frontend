import posthog, {CaptureResult, PostHogConfig} from 'posthog-js';

import {ANALYTICS_SCROLL_ROOT_SELECTOR} from 'utils/analyticsAttributes';

type AnalyticsProperties = Record<string, string | number | boolean | null>;

// PostHog reports this instead of a URL or domain when a visit has no referring site
const DIRECT_REFERRER = '$direct';
const INTERNAL_TRAFFIC_STORAGE_KEY = 'analytics_internal_traffic';

let initialized = false;
let identifiedUserId: string | null = null;

// The router replaces these paths with a real page straight away, and that page records its own pageview
const redirectRoutes = ['/backgammon', '/connect-five', '/currencies', '/exchange', '/feed', '/wallets'];

const routes = [
  '/',
  '/games',
  '/create-account',
  '/sign-in',
  '/logout',
  '/notifications',
  '/backgammon/home',
  '/backgammon/matches/:id',
  '/connect-five/home',
  '/connect-five/leaderboard',
  '/connect-five/challenges/:id',
  '/connect-five/matches/:id',
  '/currencies/home',
  '/currencies/learn-more',
  '/currencies/:id',
  '/exchange/home',
  '/exchange/learn-more',
  '/exchange/orders',
  '/exchange/trade/:id',
  '/posts/:id',
  '/profile/:id',
  '/profile/:id/coins',
  '/profile/:id/followers',
  '/profile/:id/following',
  '/profile/:id/invitations',
  '/profile/:id/photos',
  '/wallets/home',
  '/wallets/learn-more',
];

const getPath = (value: string): string | null => {
  try {
    const {pathname} = new URL(value, window.location.origin);
    return pathname.replace(/\/$/, '') || '/';
  } catch {
    return null;
  }
};

export const getAnalyticsPath = (value: string): string => {
  const path = getPath(value);
  if (path === null) return '/other';
  return routes.find((route) => new RegExp(`^${route.replace(/:id/g, '[^/]+')}$`).test(path)) || '/other';
};

export const isAnalyticsRedirectPath = (value: string): boolean => {
  const path = getPath(value);
  return path !== null && redirectRoutes.includes(path);
};

export const sanitizeAnalyticsUrl = (value: string): string => {
  try {
    const url = new URL(value, window.location.origin);
    return url.origin === window.location.origin ? `${url.origin}${getAnalyticsPath(value)}` : url.origin;
  } catch {
    return '';
  }
};

const sanitizeProperties = (properties: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(properties).flatMap(([key, value]) => {
      if (/token|password|email|username|search|query|utm_|gclid|fbclid|msclkid|text|title|href|^attr__/i.test(key)) {
        return [];
      }
      if (value === DIRECT_REFERRER) return [[key, value]];
      if (typeof value === 'string' && /url|referrer/i.test(key)) return [[key, sanitizeAnalyticsUrl(value)]];
      if (typeof value === 'string' && /pathname|path$/i.test(key)) return [[key, getAnalyticsPath(value)]];
      if (Array.isArray(value))
        return [[key, value.map((item) => (typeof item === 'object' && item ? sanitizeProperties(item) : item))]];
      if (value && typeof value === 'object') return [[key, sanitizeProperties(value)]];
      return [[key, value]];
    }),
  );
};

export const sanitizeAnalyticsEvent = (event: CaptureResult | null): CaptureResult | null => {
  if (!event) return null;
  // Existing Sentry owns exception details. PostHog receives only safe operation outcomes.
  if (event.event === '$exception') return null;
  // The recorder masks replay data before compression. Keep that payload intact while scrubbing its envelope.
  const {$snapshot_data: snapshotData, ...properties} = event.properties;
  return {
    ...event,
    properties: {
      ...sanitizeProperties(properties),
      ...(event.event === '$snapshot' && snapshotData !== undefined ? {$snapshot_data: snapshotData} : {}),
      // The ingestion token is SDK metadata; arbitrary nested token fields are still removed.
      ...(event.properties.token ? {token: event.properties.token} : {}),
    },
    ...(event.$set ? {$set: sanitizeProperties(event.$set)} : {}),
    ...(event.$set_once ? {$set_once: sanitizeProperties(event.$set_once)} : {}),
  };
};

export const analyticsConfig: Partial<PostHogConfig> = {
  autocapture: {
    capture_copied_text: false,
    capture_value_css_selector_allowlist: [],
    dom_event_allowlist: ['click', 'submit'],
  },
  before_send: sanitizeAnalyticsEvent,
  capture_dead_clicks: true,
  capture_exceptions: false,
  capture_heatmaps: false,
  capture_pageleave: true,
  capture_pageview: false,
  capture_performance: {network_timing: false, web_vitals: true},
  defaults: '2026-08-30',
  disable_capture_url_hashes: true,
  disable_surveys: true,
  enable_recording_console_log: false,
  mask_all_element_attributes: true,
  mask_all_text: true,
  mask_personal_data_properties: true,
  persistence: 'localStorage',
  person_profiles: 'identified_only',
  rageclick: true,
  respect_dnt: true,
  save_campaign_params: false,
  // Reports where a visit came from. The sanitizer reduces the referring page to its origin before it is sent.
  save_referrer: true,
  // The window never scrolls. A page scrolls in its own marked container, or else in the main area.
  scroll_root_selector: [ANALYTICS_SCROLL_ROOT_SELECTOR, '#main-scrollable-area', 'html'],
  session_recording: {
    blockSelector:
      'img, svg image, canvas, video, audio, iframe, object, embed, input[type="file"], [data-private], .ph-no-capture',
    captureJsonLd: false,
    maskAllInputs: true,
    maskAttributeFn: (name, value) => {
      if (name === 'class' || name === 'type' || name === 'role') return value;
      if (name === 'style') return value.replace(/url\([^)]*\)/gi, 'none');
      if (name === 'href' || name === 'src') return sanitizeAnalyticsUrl(value);
      return '';
    },
    maskCapturedNetworkRequestFn: () => null,
    maskTextSelector: '*',
    recordBody: false,
    recordCrossOriginIframes: false,
    recordHeaders: false,
  },
};

export const captureAnalyticsEvent = (event: string, properties?: AnalyticsProperties): void => {
  if (!initialized) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // Analytics must never interrupt the user's action.
  }
};

export const initializeAnalytics = (): void => {
  const apiHost = process.env.REACT_APP_POSTHOG_HOST;
  const projectToken = process.env.REACT_APP_POSTHOG_KEY;
  if (initialized || process.env.NODE_ENV !== 'production' || !apiHost || !projectToken) return;
  try {
    posthog.init(projectToken, {...analyticsConfig, api_host: apiHost});
    initialized = true;
  } catch {
    // The app remains usable if analytics is unavailable.
  }
};

// A browser that a staff member has signed in on stays internal after they sign out, so that their signed-out
// browsing is labelled too.
const isInternalBrowser = (isStaff: boolean): boolean => {
  try {
    if (isStaff) window.localStorage.setItem(INTERNAL_TRAFFIC_STORAGE_KEY, 'true');
    return window.localStorage.getItem(INTERNAL_TRAFFIC_STORAGE_KEY) === 'true';
  } catch {
    return isStaff;
  }
};

export const syncAnalyticsIdentity = (userId: string | null, isStaff = false): void => {
  if (!initialized) return;
  try {
    const previousUserId = identifiedUserId || posthog.get_property('$user_id');
    if (identifiedUserId !== userId || (!userId && previousUserId)) {
      if (previousUserId && previousUserId !== userId) posthog.reset(true);
      if (userId) posthog.identify(userId);
      identifiedUserId = userId;
    }
    // Lets reports leave staff activity out. Resetting the identity clears the label, so it is applied every time.
    if (isInternalBrowser(isStaff)) posthog.register({internal_traffic: true});
  } catch {
    // Identity tracking must not affect authentication.
  }
};
