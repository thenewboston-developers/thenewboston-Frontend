import {LectureReadSerializer} from 'types/api/lectures';
import {Pagination} from 'types/pagination';

export type Lecture = LectureReadSerializer;

export interface Lectures extends Pagination {
  lectures: Lecture[];
}
