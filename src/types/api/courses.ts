import {UserReadSerializer} from 'types/api/users';

import {CreatedModified} from 'types/createdModified';

export interface CourseReadSerializer extends CreatedModified {
  description: string;
  id: number;
  instructor: UserReadSerializer;
  name: string;
  publication_status: string;
  thumbnail: string;
}
