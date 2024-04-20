import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import 'styles/globalStyle.css';
import Course from 'components/University/Courses';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Loader from 'components/Loader';
import {AppDispatch, SFC} from 'types';
import {Row, Col} from 'styles/components/GridStyle';
import {displayErrorToast} from 'utils/toasts';
import {getCourses as _getCourses, resetCourses as _resetCourses} from 'dispatchers/courses';
import {getCourses, hasMoreCourses, isLoadingCourses} from 'selectors/state';

import * as S from './Styles';

const Courses: SFC = ({className}) => {
  const courses = useSelector(getCourses);
  const hasMore = useSelector(hasMoreCourses);
  const isLoading = useSelector(isLoadingCourses);

  const dispatch = useDispatch<AppDispatch>();

  const courseList = useMemo(() => Object.values(courses), [courses]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetCourses());
        await dispatch(_getCourses());
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching courses');
      }
    })();
  }, [dispatch]);

  const fetchMoreCourses = async () => {
    if (!isLoading) {
      await dispatch(_getCourses());
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader className="align-screen-center" size={24} />;
    }

    if (courseList.length) {
      return (
        <InfiniteScroll dataLength={courseList.length} hasMore={hasMore} next={fetchMoreCourses}>
          <Row>
            {courseList.map((course) => (
              <Col size={4} key={course.id}>
                <Course course={course} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      );
    }

    return <EmptyPage bottomText="No courses to display." graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Courses;
