import {PATH_GAMES} from 'constants/paths';

/**
 * Determines whether a navigation item should be shown as active for the current location.
 * The match is path segment aware, so a root path of "/profile/1" is active on "/profile/1" and "/profile/1/photos"
 * but not on "/profile/12".
 */
export const isPathActive = (pathname: string, rootPath: string): boolean => {
  const sectionPaths =
    rootPath === PATH_GAMES
      ? [
          PATH_GAMES,
          '/connect-five',
          '/backgammon',
          '/battleship',
          '/checkers',
          '/reversi',
          '/mancala',
          '/dots-and-boxes',
          '/hex',
          '/plinko',
          '/slots',
          '/roulette',
          '/casino',
        ]
      : [rootPath];
  return sectionPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
};
