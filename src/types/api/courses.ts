import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {PublicationStatus} from 'enums/publicationStatus';

export interface CourseReadSerializer extends CreatedModified {
  description: string;
  id: number;
  instructor: UserReadSerializer;
  name: string;
  publication_status: PublicationStatus;
  thumbnail: string;
}
