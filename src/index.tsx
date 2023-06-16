import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from 'containers/App';
import GlobalStyle from 'styles/components/GlobalStyle';
import ToastifyStyle from 'styles/components/ToastifyStyle';
import 'styles/fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <GlobalStyle />
    <ToastifyStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
);
