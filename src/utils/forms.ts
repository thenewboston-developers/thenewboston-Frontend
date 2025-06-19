import {displayErrorToast} from './toasts';

interface FormikHelpers {
  setFieldError: (field: string, message: string) => void;
}

export const handleFormikAPIError = (error: any, helpers: FormikHelpers, genericErrorMessage: string): void => {
  if (error?.response?.data) {
    const errorData = error.response.data;

    // Handle array responses (e.g., ["Invalid or used invitation code"])
    if (Array.isArray(errorData) && errorData.length > 0) {
      displayErrorToast(errorData[0]);
      return;
    }

    // Handle object responses (e.g., {"field_name": ["error message"]})
    if (typeof errorData === 'object') {
      let hasFieldError = false;
      let nonFieldError = null;

      Object.keys(errorData).forEach((fieldName) => {
        if (Array.isArray(errorData[fieldName]) && errorData[fieldName].length > 0) {
          if (fieldName === 'non_field_errors') {
            [nonFieldError] = errorData[fieldName];
          } else {
            helpers.setFieldError(fieldName, errorData[fieldName][0]);
            hasFieldError = true;
          }
        }
      });

      if (!hasFieldError) {
        displayErrorToast(nonFieldError || genericErrorMessage);
      }
      return;
    }
  }

  displayErrorToast(genericErrorMessage);
};
