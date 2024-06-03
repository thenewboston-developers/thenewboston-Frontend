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

/**
 * Computes cumulative reward amounts for a list of contributions.
 * Contributions are sorted by the creation date, and each entry is appended with a cumulative reward total.
 */
export const getCumulativeContributions = (contributions: any[]): any[] => {
  let cumulativeTotal = 0;
  return contributions
    .sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime())
    .map((contribution) => {
      cumulativeTotal += contribution.reward_amount;
      return {
        ...contribution,
        total_rewards: cumulativeTotal, // Append cumulative reward to each contribution
      };
    });
};
