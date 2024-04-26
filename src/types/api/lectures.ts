import {CourseReadSerializer} from './courses';
import {CreatedModified} from 'types/createdModified';
import {PublicationStatus} from 'enums/publicationStatus';

export interface LectureReadSerializer extends CreatedModified {
  course: CourseReadSerializer;
  description: string;
  duration_seconds: number;
  id: number;
  name: string;
  position: number;
  publication_status: PublicationStatus;
  thumbnail_url: string;
  youtube_id: string;
}
