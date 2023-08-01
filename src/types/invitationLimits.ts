import {Dict} from 'types/generic';

export interface InvitationLimit {
  amount: number;
  id: number;
  owner: number;
}

export type InvitationLimits = Dict<InvitationLimit>;
