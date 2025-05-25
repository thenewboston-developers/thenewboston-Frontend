import ReactDOM from 'react-dom/client';
import {SkeletonTheme} from 'react-loading-skeleton';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';

import initSentry from 'config/sentry';
import App from 'containers/App';
import {persistor, store} from 'store';
import {colors} from 'styles';
import GlobalStyle from 'styles/components/GlobalStyle';
import ToastifyStyle from 'styles/components/ToastifyStyle';

import 'react-loading-skeleton/dist/skeleton.css';
import 'styles/fonts.css';

initSentry();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <ToastifyStyle />
      <SkeletonTheme highlightColor={colors.palette.gray[300]} baseColor={colors.whiteSmoke}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SkeletonTheme>
    </PersistGate>
  </Provider>,
);
