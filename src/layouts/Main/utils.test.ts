import {isPathActive} from './utils';

describe('isPathActive', () => {
  it.each([
    '/games',
    '/games/',
    '/connect-five',
    '/connect-five/home',
    '/connect-five/matches/12',
    '/backgammon',
    '/backgammon/home',
    '/backgammon/matches/12',
    '/battleship',
    '/battleship/home',
    '/battleship/matches/12',
    '/reversi',
    '/reversi/home',
    '/reversi/matches/12',
  ])('keeps Games active on %s', (pathname) => {
    expect(isPathActive(pathname, '/games')).toBe(true);
  });

  it.each([
    '/games-extra',
    '/connect-five-extra',
    '/backgammon-extra',
    '/battleship-extra',
    '/reversi-extra',
    '/exchange',
    '/',
  ])('does not activate Games on %s', (pathname) => {
    expect(isPathActive(pathname, '/games')).toBe(false);
  });

  it('preserves segment-aware matching for other sections', () => {
    expect(isPathActive('/profile/1/photos', '/profile/1')).toBe(true);
    expect(isPathActive('/profile/12', '/profile/1')).toBe(false);
    expect(isPathActive('/games', '/')).toBe(false);
    expect(isPathActive('/', '/')).toBe(true);
  });
});
