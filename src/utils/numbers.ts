export function formatNumber(number: number, locale = 'en-US'): string {
  return number.toLocaleString(locale);
}
