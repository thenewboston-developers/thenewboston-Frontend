import React from 'react';
import * as Sentry from '@sentry/react';
import {useLocation, useNavigationType, createRoutesFromChildren, matchRoutes} from 'react-router-dom';

const initSentry = (): void => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        createRoutesFromChildren,
        matchRoutes,
        useEffect: React.useEffect,
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
  });
};

export default initSentry;
