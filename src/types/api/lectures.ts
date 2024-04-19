import {CourseReadSerializer} from './courses';
import {CreatedModified} from 'types/createdModified';

export interface LectureReadSerializer extends CreatedModified {
  course: CourseReadSerializer;
  description: string;
  duration_seconds: number;
  id: number;
  name: string;
  position: number;
  publication_status: string;
  thumbnail_url: string;
  youtube_id: string;
}
