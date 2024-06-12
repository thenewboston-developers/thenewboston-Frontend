import ContributionTypes from 'assets/contributorsLearnMore/contribution_types.png';
import GithubContributor from 'assets/contributorsLearnMore/github_contributor.png';
import ManualContributor from 'assets/contributorsLearnMore/manual_contributor.png';
import Overview from 'assets/contributorsLearnMore/overview.png';
import QA from 'assets/contributorsLearnMore/QA.png';
import {LearnMore} from 'types';

export const CONTRIBUTION_TYPES: LearnMore = {
  detail:
    'There are two types of contributions: GitHub contributions and manual contributions. For GitHub contributions, whenever a pull request (PR) is merged into the master branch, Ia will automatically assess the value of that PR. For manual contributions, users submit a description of their contribution, and Ia will make her assessment based on that.',
  img: ContributionTypes,
  title: 'Types of Contributions: GitHub and Manual',
};

export const HOW_TO_BECOME_GITHUB_CONTRIBUTOR: LearnMore = {
  detail: `To become a GitHub contributor, message Bucky to link your thenewboston.com account to your GitHub account.`,
  img: GithubContributor,
  logo: QA,
  title: 'How do I become a GitHub contributor?',
};

export const HOW_TO_BECOME_MANUAL_CONTRIBUTOR: LearnMore = {
  detail: `To become a manual contributor, message Bucky and begin actively participating in The New Boston (TNB) community.`,
  img: ManualContributor,
  logo: QA,
  title: 'How do I become a manual contributor?',
};

export const HOW_CONTRIBUTION_IS_DETERMINED: LearnMore = {
  detail: `Ia is trained on verified contributions, each assigned a "true value" score based on the time taken to complete the tasks. This time is converted to a score using a standard rate of 1,000 TNB/hour. Over time as more verified contributions are added to the training data, Ia will become better at accurately assessing the value of each contribution.`,
  logo: QA,
  title: 'How does Ia determine the value of a contribution?',
};

export const OVERVIEW: LearnMore = {
  detail:
    'Thenewboston is an open-source project that anyone can contribute to, including developers, designers, and more. In exchange for their contributions, users receive TNB. The amount of TNB received is proportional to the value of the contribution, which is determined by Ia, our AI.',
  img: Overview,
  title: 'Overview',
};
