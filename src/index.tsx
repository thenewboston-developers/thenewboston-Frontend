import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import {SkeletonTheme} from 'react-loading-skeleton';

import App from 'containers/App';
import GlobalStyle from 'styles/components/GlobalStyle';
import ToastifyStyle from 'styles/components/ToastifyStyle';
import initSentry from 'config/sentry';
import {colors} from 'styles';
import {persistor, store} from 'store';
import 'react-loading-skeleton/dist/skeleton.css';
import 'styles/fonts.css';

initSentry();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <ToastifyStyle />
      <SkeletonTheme highlightColor={colors.palette.gray[100]} baseColor={colors.whiteSmoke}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SkeletonTheme>
    </PersistGate>
  </Provider>,
);
