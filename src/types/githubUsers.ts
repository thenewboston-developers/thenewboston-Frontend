import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface GitHubUser extends CreatedModified {
  github_id: number;
  github_username: string;
  id: number;
  reward_recipient: UserReadSerializer;
}
