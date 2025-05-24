/**
 * Formats a number according to the given locale settings.
 */
export function formatNumber(number: number, locale = 'en-US'): string {
  return number.toLocaleString(locale);
}
/**
 * Formats a number to a specified number of significant digits and appends a unit suffix (k, m, b, t).
 *
 * @param {number} num - The number to format.
 * @param {number} [digits=3] - The number of significant digits to display before the unit suffix.
 * @returns {string} The formatted number as a string with the appropriate unit suffix.
 *
 * @example
 * formatToDynamicDigits(2300); // returns "2.3k"
 * formatToDynamicDigits(15300); // returns "15.3k"
 * formatToDynamicDigits(1530000, 2); // returns "1.5m"
 */

export function formatToDynamicDigits(givenNumber: number, digits = 3) {
  const units = ['', 'k', 'm', 'b', 't'];
  let unitIndex = 0;

  while (givenNumber >= 1000 && unitIndex < units.length - 1) {
    givenNumber /= 1000;
    unitIndex += 1;
  }

  const roundedNum = Math.floor(givenNumber * 10 ** (digits - 1)) / 10 ** (digits - 1);
  const isExact = (givenNumber * 10 ** (digits - 1)) % 1 === 0;

  return isExact ? roundedNum + units[unitIndex] : roundedNum + units[unitIndex] + '+';
}
