export const longDate = (date: number | string | Date): string => {
  const customDate = new Date(date);
  const dateStr = customDate.toLocaleDateString(undefined, {dateStyle: 'long'});
  const timeStr = customDate.toLocaleTimeString(undefined, {timeStyle: 'long'});
  return `${dateStr} at ${timeStr}`;
};
