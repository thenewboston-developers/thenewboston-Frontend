import firstPosition from 'assets/positions/1.svg';
import secondPosition from 'assets/positions/2.svg';
import thirdPosition from 'assets/positions/3.svg';
import fourthPosition from 'assets/positions/4.svg';
import fifthPosition from 'assets/positions/5.svg';

/**
 * List of icons for contributor positions.
 */
const positionIcons = [firstPosition, secondPosition, thirdPosition, fourthPosition, fifthPosition];

/**
 * Retrieves the SVG icon for the given position.
 */
export const getPositionIcon = (position: number): string => {
  return positionIcons[position - 1] || '';
};
