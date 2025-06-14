import {useEffect} from 'react';
import {createRoutesFromChildren, matchRoutes, useLocation, useNavigationType} from 'react-router-dom';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://c48af4261d1993547a24e785a6bbf566@o455400.ingest.us.sentry.io/4507120966959104',

  // Environment - this helps filter issues in Sentry
  environment: process.env.NODE_ENV,

  // Only enable error reporting in production
  enabled: process.env.NODE_ENV === 'production',

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      createRoutesFromChildren,
      matchRoutes,
      useEffect: useEffect,
      useLocation,
      useNavigationType,
    }),
    Sentry.replayIntegration(),
  ],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 100%. You may want to change this in production.
  sampleRate: 1.0,

  // Filter out local development errors if needed
  beforeSend(event) {
    // You can filter or modify events here
    return event;
  },
});
