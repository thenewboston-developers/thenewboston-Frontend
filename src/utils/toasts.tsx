import {ReactNode} from 'react';
import {toast} from 'react-toastify';

import Toast from 'components/Toast';
import {ToastType} from 'enums';

export const displayErrorToast = (error: any) => {
  let errorStr: string;

  if (typeof error === 'string') {
    errorStr = error;
  } else if (error?.response?.data) {
    errorStr = JSON.stringify(error.response.data);
  } else if (error?.message) {
    errorStr = error.message;
  } else if (error?.detail) {
    errorStr = error.detail;
  } else {
    errorStr = JSON.stringify(error);
  }

  displayToast(errorStr, ToastType.ERROR);
};

export const displayToast = (message: ReactNode, type: ToastType, className?: string): void => {
  toast(
    <Toast className={className} type={type}>
      {message}
    </Toast>,
  );
};
