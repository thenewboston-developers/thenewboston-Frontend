import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';

import App from 'containers/App';
import {persistor, store} from 'store';
import GlobalStyle from 'styles/components/GlobalStyle';
import ToastifyStyle from 'styles/components/ToastifyStyle';
import 'styles/fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <ToastifyStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
