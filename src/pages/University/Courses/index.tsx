import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {getCourses as _getCourses, resetCourses as _resetCourses} from 'dispatchers/courses';
import {getCourses as _getCoursesState} from 'selectors/state';
import {getSelf} from 'selectors/state';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import Button from 'components/Button';
import Course from './Course';
import CourseModal from 'modals/CourseModal';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Loader from 'components/Loader';
import Toolbar from 'pages/University/Toolbar';
import * as S from './Styles';
import {UniversityHeader} from './Header';
import {mdiMagnify} from '@mdi/js';
import {colors} from 'styles';

export interface CoursesProps {
  selfCourses?: boolean;
}

const Courses: SFC<CoursesProps> = ({className, selfCourses = false}) => {
  const [courseModalIsOpen, toggleCourseModal] = useToggle(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const {hasMore, isLoading, courses} = useSelector(_getCoursesState);
  const self = useSelector(getSelf);

  const dispatch = useDispatch<AppDispatch>();

  const courseList = useMemo(() => Object.values(courses), [courses]);
  const apiParams = useMemo(() => {
    if (selfCourses && self.id) {
      return {instructor_id: self.id};
    } else {
      return {publication_status: PublicationStatus.PUBLISHED};
    }
  }, [selfCourses, self.id]);

  useEffect(() => {
    const initFetch = async () => {
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
    };

    initFetch();
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
          <S.HeaderSection>
            <h2>Learn with Us: Empower Your Journey</h2>
            <S.SearchContainer className="disabled">
              <S.Input placeholder="Search" />
              <S.Icon color={colors.gray} path={mdiMagnify} size={'20px'} />
            </S.SearchContainer>
          </S.HeaderSection>
          <InfiniteScroll dataLength={courseList.length} hasMore={hasMore} next={fetchMoreCourses}>
            <S.Row>
              {courseList.map((course) => {
                return (
                  <S.Col>
                    <Course course={course} selfCourse={selfCourses} />
                  </S.Col>
                );
              })}
            </S.Row>
          </InfiniteScroll>
        </S.ContentContainer>
      );
    }

    return <EmptyPage bottomText="No courses to display." graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  const renderSectionHeading = () => {
    if (selfCourses) return <S.SectionHeading heading="My Courses" rightContent={renderAddCourseButton()} />;

    return <UniversityHeader />;
  };

  const renderCourseModal = () => {
    return courseModalIsOpen ? <CourseModal close={toggleCourseModal} /> : null;
  };

  return (
    <S.Container className={className}>
      <Toolbar />
      <S.CoursesContainer>
        {renderSectionHeading()}
        {renderContent()}
      </S.CoursesContainer>
      {renderCourseModal()}
    </S.Container>
  );
};

export default Courses;
