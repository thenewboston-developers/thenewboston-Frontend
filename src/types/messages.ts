import {SenderType} from 'enums';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Message extends CreatedModified {
  conversation: number;
  id: number;
  sender: UserReadSerializer;
  sender_type: SenderType;
  text: string;
}

export type Messages = Dict<Message>;
