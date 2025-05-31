/**
 * Formats a number according to the given locale settings.
 */
export function formatNumber(number: number, locale = 'en-US'): string {
  return number.toLocaleString(locale);
}
