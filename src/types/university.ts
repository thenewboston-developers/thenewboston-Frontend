import {CourseReadSerializer, LectureReadSerializer} from 'types/api/university';
import {Pagination} from 'types/pagination';

export type Course = CourseReadSerializer;
export type Lecture = LectureReadSerializer;

export interface Courses extends Pagination {
  courses: Course[];
}

export interface Lectures extends Pagination {
  lectures: Lecture[];
}
