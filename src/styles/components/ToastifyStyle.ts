import {createGlobalStyle} from 'styled-components';

import fonts from 'styles/fonts';

const ToastifyStyle = createGlobalStyle`
  /* React-toastify v11 uses CSS variables and different structure */
  :root {
    --toastify-toast-width: 300px;
    --toastify-toast-min-height: 42px;
  }

  .Toastify__toast {
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(4, 34, 53, 0.3);
    min-height: var(--toastify-toast-min-height);
    padding: 0;
    font-family: ${fonts.family.default};
  }

  .Toastify__toast-container {
    width: var(--toastify-toast-width);
    padding: 0;
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }

  .Toastify__close-button {
    display: none;
  }

  /* Ensure our custom toast content takes full width */
  .Toastify__toast-body > div {
    width: 100%;
  }
`;

export default ToastifyStyle;
