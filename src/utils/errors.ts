/**
 * Checks if an error is a request cancellation error.
 * Axios with AbortController throws 'CanceledError' with code 'ERR_CANCELED'.
 * This function checks for various cancellation error types to ensure compatibility.
 */
export const isCancellationError = (error: any): boolean => {
  return error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError';
};
