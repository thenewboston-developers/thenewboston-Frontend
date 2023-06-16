import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from 'containers/App';
import GlobalStyle from 'styles/components/GlobalStyle';
import 'styles/fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
);
