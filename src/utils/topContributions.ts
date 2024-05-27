import firstPosition from 'assets/positions/1.svg';
import secondPosition from 'assets/positions/2.svg';
import thirdPosition from 'assets/positions/3.svg';
import fourthPosition from 'assets/positions/4.svg';
import {TopContribution, TopContributor} from '../types/topContributions';

/**
 * List of icons for contributor positions.
 */
const positionIcons = [firstPosition, secondPosition, thirdPosition, fourthPosition];
/**
 * Retrieves the SVG icon for the given position.
 */
export const getPositionIcon = (position: number): string => {
  return positionIcons[position - 1] || '';
};

/**
 * Aggregates contributions by users and determines the top five contributors.
 */
export const getTopContributors = (contributions: TopContribution[]): TopContributor[] => {
  const contributionSumByUser = contributions.reduce((acc: Record<number, TopContributor>, contribution) => {
    const userId = contribution.user_id;
    if (!acc[userId]) {
      acc[userId] = {
        core: {
          logo: '',
        },
        positionIcon: '',
        user: {
          avatar: contribution.user_avatar,
          id: contribution.user_id,
          logo_url: contribution.logo_url,
          total: contribution.total,
          username: contribution.user_username,
        },
      };
    } else {
      acc[userId].user.total += contribution.total;
    }
    return acc;
  }, {});

  const sortedContributors = Object.values(contributionSumByUser).sort((a, b) => b.user.total - a.user.total);
  return sortedContributors.map((contributor, index) => ({
    ...contributor,
    positionIcon: getPositionIcon(index + 1),
  }));
};
