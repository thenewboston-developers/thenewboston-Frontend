import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import Loader from 'components/Loader';
import {getCourses as _getCourses, resetCourses as _resetCourses} from 'dispatchers/courses';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import CourseModal from 'modals/CourseModal';
import Toolbar from 'pages/University/Toolbar';
import {getCourses as _getCoursesState, getSelf} from 'selectors/state';
import {Col, Row} from 'styles/components/GridStyle';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import Course from './Course';
import {UniversityHeader} from './Header';
import * as S from './Styles';

export interface CoursesProps {
  selfCourses?: boolean;
}

const Courses: SFC<CoursesProps> = ({className, selfCourses = false}) => {
  const [courseModalIsOpen, toggleCourseModal] = useToggle(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const {hasMore, isLoading, courses} = useSelector(_getCoursesState);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const apiParams = useMemo(() => {
    if (selfCourses && self.id) {
      return {instructor_id: self.id};
    } else {
      return {publication_status: PublicationStatus.PUBLISHED};
    }
  }, [selfCourses, self.id]);

  const courseList = useMemo(() => Object.values(courses), [courses]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetCourses());
        setIsInitialLoading(true);
        await dispatch(_getCourses(apiParams));
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        setIsInitialLoading(false);
        displayErrorToast('Error fetching courses');
      }
    })();
  }, [dispatch, apiParams]);

  const fetchMoreCourses = async () => {
    if (!isLoading) {
      await dispatch(_getCourses());
    }
  };

  const renderAddCourseButton = () => {
    return <Button onClick={toggleCourseModal} text="Add Course" />;
  };

  const renderContent = () => {
    if (isLoading && isInitialLoading) {
      return <Loader className="align-screen-center" size={24} />;
    }

    if (courseList.length) {
      return (
        <S.ContentContainer>
          {renderSectionSubHeading()}
          <Row>
            {courseList.map((course) => {
              return (
                <Col size={4} key={course.id}>
                  <Course course={course} selfCourse={selfCourses} />
                </Col>
              );
            })}
          </Row>
        </S.ContentContainer>
      );
    }

    return <EmptyPage bottomText="No courses to display." graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  const renderCourseModal = () => {
    return courseModalIsOpen ? <CourseModal close={toggleCourseModal} /> : null;
  };

  const renderSectionHeading = () => {
    if (selfCourses) return <S.SectionHeading heading="My Courses" rightContent={renderAddCourseButton()} />;

    return <UniversityHeader />;
  };

  const renderSectionSubHeading = () => {
    const subHeading = selfCourses ? 'Manage your courses efficiently' : 'Learn with Us: Empower Your Journey';

    return (
      <S.SectionSubHeading>
        <h2>{subHeading}</h2>
      </S.SectionSubHeading>
    );
  };

  return (
    <S.Container className={className}>
      <Toolbar />
      <S.CoursesContainer>
        <InfiniteScroll dataLength={courseList.length} hasMore={hasMore} next={fetchMoreCourses}>
          {renderSectionHeading()}
          {renderContent()}
        </InfiniteScroll>
      </S.CoursesContainer>
      {renderCourseModal()}
    </S.Container>
  );
};

export default Courses;
