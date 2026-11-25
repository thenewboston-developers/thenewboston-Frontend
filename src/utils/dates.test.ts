import {getTimeAgo} from 'utils/dates';

describe('getTimeAgo', () => {
  const secondsAgo = (seconds: number) => new Date(Date.now() - seconds * 1000);

  it('says "Just now" for the last minute, and for times slightly in the future', () => {
    expect(getTimeAgo(secondsAgo(0))).toBe('Just now');
    expect(getTimeAgo(secondsAgo(59))).toBe('Just now');
    expect(getTimeAgo(secondsAgo(-3))).toBe('Just now');
  });

  it('counts minutes, hours, days, months and years', () => {
    expect(getTimeAgo(secondsAgo(60))).toBe('1 minute ago');
    expect(getTimeAgo(secondsAgo(5 * 60))).toBe('5 minutes ago');
    expect(getTimeAgo(secondsAgo(3 * 3600))).toBe('3 hours ago');
    expect(getTimeAgo(secondsAgo(2 * 86400))).toBe('2 days ago');
    expect(getTimeAgo(secondsAgo(65 * 86400))).toBe('2 months ago');
    expect(getTimeAgo(secondsAgo(400 * 86400))).toBe('1 year ago');
  });
});
