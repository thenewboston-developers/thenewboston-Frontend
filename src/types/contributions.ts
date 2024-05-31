import {UserReadSerializer} from 'types/api/users';
import {Core} from 'types/cores';
import {CreatedModified} from 'types/createdModified';
import {GitHubUser} from 'types/githubUsers';
import {Issue} from 'types/issues';
import {Pull} from 'types/pulls';
import {Repo} from 'types/repos';

export interface Contribution extends CreatedModified {
  assessment_explanation: string;
  core: Core;
  github_user?: GitHubUser;
  id: number;
  issue?: Issue;
  pull?: Pull;
  repo?: Repo;
  reward_amount: number;
  user: UserReadSerializer;
}

export interface Contributor {
  core: Core;
  positionIcon: string;
  totalRewardAmount: number;
  user: UserReadSerializer;
}
