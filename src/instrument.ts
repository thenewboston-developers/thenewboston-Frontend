import {useEffect} from 'react';
import {createRoutesFromChildren, matchRoutes, useLocation, useNavigationType} from 'react-router-dom';
import * as Sentry from '@sentry/react';

import {hideTokens} from 'utils/sentry';

export const sentryOptions: Sentry.BrowserOptions = {
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
    Sentry.replayIntegration({beforeAddRecordingEvent: hideTokens}),
  ],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  tracePropagationTargets: [/^https:\/\/thenewboston\.network\/api(?:\/|$)/],

  // Sample performance traces separately from error reporting.
  tracesSampleRate: 0.1,

  // This sets the sample rate to be 100%. You may want to change this in production.
  sampleRate: 1.0,

  // Whatever else ends up in an event, an access or refresh token must not leave with it
  beforeSend(event, hint) {
    // Redux state attachments are JSON text. Omit opaque binary attachments, whose encoding cannot be scrubbed
    // reliably, rather than allowing them to bypass the event redactor.
    hint.attachments = hint.attachments
      ?.filter((attachment) => typeof attachment.data === 'string')
      .map((attachment) => ({
        ...attachment,
        filename: hideTokens(attachment.filename),
        data: hideTokens(attachment.data),
      }));
    return hideTokens(event);
  },
  beforeSendTransaction: hideTokens,
};

Sentry.init(sentryOptions);
