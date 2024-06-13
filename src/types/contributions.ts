import {ContributionType} from 'enums';
import {Core} from 'types/cores';
import {CreatedModified} from 'types/createdModified';
import {GitHubUser} from 'types/githubUsers';
import {Issue} from 'types/issues';
import {Pull} from 'types/pulls';
import {Repo} from 'types/repos';
import {UserReadSerializer} from 'types/api/users';

export interface Contribution extends CreatedModified {
  assessment_explanation: string;
  contribution_type: ContributionType;
  core: Core;
  description: string;
  github_user?: GitHubUser;
  id: number;
  issue?: Issue;
  pull?: Pull;
  repo?: Repo;
  reward_amount: number;
  user: UserReadSerializer;
}
