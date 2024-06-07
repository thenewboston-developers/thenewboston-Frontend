import {Core} from 'types/cores';
import {UserReadSerializer} from 'types/api/users';

export interface Contributor {
  core: Core;
  position: number;
  total_reward_amount: number;
  user: UserReadSerializer;
}

export type Contributors = Contributor[];
