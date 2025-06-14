import {displayErrorToast} from './toasts';

interface FormikHelpers {
  setFieldError: (field: string, message: string) => void;
}

export const handleFormikAPIError = (error: any, helpers: FormikHelpers, genericErrorMessage: string): void => {
  if (error?.response?.data && typeof error.response.data === 'object') {
    const fieldErrors = error.response.data;
    let hasFieldError = false;

    Object.keys(fieldErrors).forEach((fieldName) => {
      if (Array.isArray(fieldErrors[fieldName]) && fieldErrors[fieldName].length > 0) {
        helpers.setFieldError(fieldName, fieldErrors[fieldName][0]);
        hasFieldError = true;
      }
    });

    if (!hasFieldError) {
      displayErrorToast(genericErrorMessage);
    }
  } else {
    displayErrorToast(genericErrorMessage);
  }
};
