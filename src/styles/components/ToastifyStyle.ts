import {createGlobalStyle} from 'styled-components';

import colors from 'styles/colors';
import fonts from 'styles/fonts';

const ToastifyStyle = createGlobalStyle`
  /* React-toastify v11 uses CSS variables and different structure */
  :root {
    --toastify-font-family: ${fonts.family.default};
    --toastify-toast-bd-radius: 16px;
    --toastify-toast-min-height: 64px;
    --toastify-toast-width: 360px;
  }

  /* Animation improvements */
  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translate3d(110%, 0, 0);
    }
    
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes toastSlideOut {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    
    to {
      opacity: 0;
      transform: translate3d(110%, 0, 0);
    }
  }

  .Toastify__toast {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid ${colors.border};
    border-radius: var(--toastify-toast-bd-radius);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 
                0 2px 8px rgba(0, 0, 0, 0.04),
                0 0 1px rgba(0, 0, 0, 0.04);
    font-family: var(--toastify-font-family), sans-serif;
    min-height: var(--toastify-toast-min-height);
    overflow: hidden;
    padding: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 
                  0 4px 12px rgba(0, 0, 0, 0.06),
                  0 0 1px rgba(0, 0, 0, 0.04);
      transform: translateY(-2px);
    }
  }

  .Toastify__toast-container {
    padding: 16px;
    width: var(--toastify-toast-width);
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
  }

  /* Ensure our custom toast content takes full width */
  .Toastify__toast-body > div {
    width: 100%;
  }

  .Toastify__close-button {
    display: none;
  }

  /* Progress bar styling */
  .Toastify__progress-bar {
    height: 3px;
    opacity: 0.7;
  }

  .Toastify__progress-bar--success {
    background: ${colors.palette.green[500]};
  }

  .Toastify__progress-bar--error {
    background: ${colors.palette.red[400]};
  }

  .Toastify__progress-bar--warning {
    background: ${colors.palette.orange[500]};
  }

  .Toastify__progress-bar--info {
    background: ${colors.palette.blue[500]};
  }

  .Toastify__slide-enter--top-right,
  .Toastify__slide-enter--bottom-right {
    animation: toastSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .Toastify__slide-exit--top-right,
  .Toastify__slide-exit--bottom-right {
    animation: toastSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export default ToastifyStyle;
