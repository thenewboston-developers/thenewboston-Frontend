/**
 * Determines whether a navigation item should be shown as active for the current location.
 * The match is path segment aware, so a root path of "/profile/1" is active on "/profile/1" and "/profile/1/photos"
 * but not on "/profile/12".
 */
export const isPathActive = (pathname: string, rootPath: string): boolean => {
  return pathname === rootPath || pathname.startsWith(`${rootPath}/`);
};
