import {UserReadSerializer} from 'types/api/users';

import {CreatedModified} from 'types/createdModified';

interface BaseReadSerializer extends CreatedModified {
  id: number;
  name: string;
  description: string;
  publication_status: string;
}

export interface CourseReadSerializer extends BaseReadSerializer {
  instructor: UserReadSerializer;
  thumbnail: string;
}

export interface LectureReadSerializer extends BaseReadSerializer {
  course: CourseReadSerializer;
  youtube_id: string;
  position: number;
  thumbnail_url: string;
  duration_seconds: number;
}
