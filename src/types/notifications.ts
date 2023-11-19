import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Notification extends CreatedModified {
  id: number;
  is_read: boolean;
  owner: number;
  payload: any;
}

export type Notifications = Dict<Notification>;
