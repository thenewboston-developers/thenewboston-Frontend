import {CreatedModified} from 'types/createdModified';
import {CourseReadSerializer} from './courses';

export interface LectureReadSerializer extends CreatedModified {
  course: CourseReadSerializer;
  description: string;
  id: number;
  name: string;
  position: number;
  publication_status: string;
  thumbnail_url: string;
  youtube_id: string;
}
