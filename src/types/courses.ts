import {CourseReadSerializer} from 'types/api/courses';
import {Pagination} from 'types/pagination';

export type Course = CourseReadSerializer;

export interface Courses extends Pagination {
  courses: Course[];
}
