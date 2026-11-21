/**
 * Checks if an error is a request cancellation error.
 * Axios with AbortController throws 'CanceledError' with code 'ERR_CANCELED'.
 * This function checks for various cancellation error types to ensure compatibility.
 */
export const isCancellationError = (error: any): boolean => {
  return error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError';
};

/**
 * Checks if the API rejected a request for lacking valid authentication.
 * For a signed-in member this means that the session has expired, which utils/session reports and handles.
 */
export const isUnauthorizedError = (error: any): boolean => {
  return error?.response?.status === 401;
};
