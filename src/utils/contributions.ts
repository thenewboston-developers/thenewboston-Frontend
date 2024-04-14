import firstPosition from 'assets/positions/1.svg';
import secondPosition from 'assets/positions/2.svg';
import thirdPosition from 'assets/positions/3.svg';
import fourthPosition from 'assets/positions/4.svg';
import fifthPosition from 'assets/positions/5.svg';

import {Contribution, Contributor} from 'types';

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
 * Aggregates contributions by users and determines the top five contributors over the past week.
 */
export const getTopContributors = (contributions: Contribution[]): Contributor[] => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const filteredContributions = contributions.filter(
    (contribution) => new Date(contribution.created_date) >= oneWeekAgo,
  );

  const contributionSumByUser = filteredContributions.reduce((acc: Record<number, Contributor>, contribution) => {
    const userId = contribution.user.id;
    const rewardAmount = contribution.reward_amount || 0;
    if (!acc[userId]) {
      acc[userId] = {
        core: contribution.core,
        positionIcon: '',
        totalRewardAmount: 0,
        user: contribution.user,
      };
    }
    acc[userId].totalRewardAmount += rewardAmount;
    return acc;
  }, {});

  return Object.values(contributionSumByUser)
    .sort((a, b) => b.totalRewardAmount - a.totalRewardAmount)
    .slice(0, 5)
    .map((contributor, index) => ({
      ...contributor,
      positionIcon: getPositionIcon(index + 1),
    }));
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
