import {displayErrorToast} from './toasts';

interface FormikHelpers {
  setFieldError: (field: string, message: string) => void;
}

const extractErrorMessage = (errorValue: any): string | null => {
  if (typeof errorValue === 'string') return errorValue;

  if (Array.isArray(errorValue) && errorValue.length > 0) {
    return extractErrorMessage(errorValue[0]);
  }

  if (errorValue && typeof errorValue === 'object' && typeof errorValue.message === 'string') {
    return errorValue.message;
  }

  return null;
};

export const handleFormikAPIError = (error: any, helpers: FormikHelpers, genericErrorMessage: string): void => {
  if (error?.response?.data) {
    const errorData = error.response.data;

    // Handle array responses (e.g., ["Invalid or used invitation code"])
    if (Array.isArray(errorData) && errorData.length > 0) {
      const message = extractErrorMessage(errorData);
      displayErrorToast(message || genericErrorMessage);
      return;
    }

    // Handle object responses (e.g., {"field_name": ["error message"]})
    if (typeof errorData === 'object') {
      let hasFieldError = false;
      let nonFieldError: string | null = null;

      Object.keys(errorData).forEach((fieldName) => {
        const message = extractErrorMessage(errorData[fieldName]);

        if (!message) {
          return;
        }

        if (fieldName === 'non_field_errors') {
          nonFieldError = message;
          return;
        }

        helpers.setFieldError(fieldName, message);
        hasFieldError = true;
      });

      if (!hasFieldError) {
        displayErrorToast(nonFieldError || genericErrorMessage);
      }
      return;
    }
  }

  displayErrorToast(genericErrorMessage);
};
