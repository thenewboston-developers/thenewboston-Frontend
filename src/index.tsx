// Sentry initialization should be imported first
// eslint-disable-next-line simple-import-sort/imports
import './instrument';

import ReactDOM from 'react-dom/client';
import {SkeletonTheme} from 'react-loading-skeleton';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import {PersistGate} from 'redux-persist/integration/react';

import App from 'containers/App';
import AppInitializer from 'containers/AppInitializer';
import {persistor, store} from 'store';
import {colors} from 'styles';
import GlobalStyle from 'styles/components/GlobalStyle';
import ToastifyStyle from 'styles/components/ToastifyStyle';

import 'react-loading-skeleton/dist/skeleton.css';
import 'styles/fonts.css';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container, {
  onUncaughtError: Sentry.reactErrorHandler(),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <ToastifyStyle />
      <SkeletonTheme highlightColor={colors.palette.gray[300]} baseColor={colors.whiteSmoke}>
        <BrowserRouter>
          <Sentry.ErrorBoundary fallback={<p>An error has occurred. Please refresh the page.</p>}>
            <AppInitializer>
              <App />
            </AppInitializer>
          </Sentry.ErrorBoundary>
        </BrowserRouter>
      </SkeletonTheme>
    </PersistGate>
  </Provider>,
);
