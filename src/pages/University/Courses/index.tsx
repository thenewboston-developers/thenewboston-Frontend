import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import Loader from 'components/Loader';
import {getCourses as _getCourses, resetCourses as _resetCourses} from 'dispatchers/courses';
import {getCourses, hasMoreCourses, isLoadingCourses} from 'selectors/state';
import {Col, Row} from 'styles/components/GridStyle';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import Course from './Course';
import * as S from './Styles';

const Courses: SFC = ({className}) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const courses = useSelector(getCourses);
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMoreCourses);
  const isLoading = useSelector(isLoadingCourses);

  const courseList = useMemo(() => Object.values(courses), [courses]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetCourses());
        setIsInitialLoading(true);
        await dispatch(_getCourses());
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        setIsInitialLoading(false);
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
    if (isLoading && isInitialLoading) {
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
