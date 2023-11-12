export const chartDisplayDate = (date: number | string | Date): string => {
  const customDate = new Date(date);
  const month = String(customDate.getMonth() + 1).padStart(2, '0');
  const day = String(customDate.getDate()).padStart(2, '0');
  const year = String(customDate.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

const getPluralizedTime = (value: number, singularNoun: string, pluralNoun: string): string => {
  return `${value} ${value === 1 ? singularNoun : pluralNoun}`;
};

export const getTimeAgo = (date: Date | number | string): string => {
  const _date = new Date(date);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - _date.getTime()) / 1000);
  if (seconds < 60) return getPluralizedTime(seconds, 'second', 'seconds') + ' ago';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return getPluralizedTime(minutes, 'minute', 'minutes') + ' ago';

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return getPluralizedTime(hours, 'hour', 'hours') + ' ago';

  const days = Math.floor(hours / 24);
  if (days < 30) return getPluralizedTime(days, 'day', 'days') + ' ago';

  const months = Math.floor(days / 30);
  if (months < 12) return getPluralizedTime(months, 'month', 'months') + ' ago';

  const years = Math.floor(months / 12);
  return getPluralizedTime(years, 'year', 'years') + ' ago';
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const longDate = (date: number | string | Date): string => {
  const customDate = new Date(date);
  const dateStr = customDate.toLocaleDateString(undefined, {dateStyle: 'long'});
  const timeStr = customDate.toLocaleTimeString(undefined, {timeStyle: 'long'});
  return `${dateStr} at ${timeStr}`;
};

export const shortDate = (date: Date | number | string, includeTodayAt: boolean): string => {
  const _date = new Date(date);

  if (isToday(_date)) {
    const timeStr = _date.toLocaleTimeString(undefined, {timeStyle: 'short'});
    const todayAt = includeTodayAt ? 'Today at' : '';
    return `${todayAt} ${timeStr}`;
  }

  return getTimeAgo(_date);
};
