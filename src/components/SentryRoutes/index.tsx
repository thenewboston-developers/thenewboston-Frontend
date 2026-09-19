import {Routes} from 'react-router-dom';
import {withSentryReactRouterV6Routing} from '@sentry/react';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export default SentryRoutes;
