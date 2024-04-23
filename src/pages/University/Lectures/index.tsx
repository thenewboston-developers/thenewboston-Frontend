import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Breadcrumbs from 'components/Breadcrumbs';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import Loader from 'components/Loader';
import {PATH_COURSES} from 'constants/paths';
import {getLectures as _getLectures, resetLectures} from 'dispatchers/lectures';
import {Col, Row} from 'styles/components/GridStyle';
import {getLectures as _getLecturesState} from 'selectors/state';
import {AppDispatch, Lecture as TLecture, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import Lecture from './Lecture';
import LectureVideoPlayer from './LectureVideoPlayer';
import * as S from './Styles';

const Lectures: SFC = ({className}) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState<TLecture | undefined>();
  const {hasMore, isLoading, lectures} = useSelector(_getLecturesState);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const course_id = queryParams.get('course_id') || undefined;

  const lecturesList = useMemo(() => Object.values(lectures), [lectures]);

  useEffect(() => {
    const initFetch = async () => {
      try {
        dispatch(resetLectures());
        setIsInitialLoading(true);
        await dispatch(_getLectures({course_id: course_id}));
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        setIsInitialLoading(false);
        displayErrorToast('Error fetching lectures');
      }
    };

    initFetch();
  }, [dispatch, course_id]);

  useEffect(() => {
    if (lecturesList.length > 0) {
      setSelectedLecture(lecturesList[0]);
    }
  }, [lecturesList]);

  const fetchMoreLectures = async () => {
    if (!isLoading && hasMore) {
      try {
        await dispatch(_getLectures());
      } catch (error) {
        console.error(error);
        displayErrorToast('Failed to load more lectures');
      }
    }
  };

  const onLectureClick = (lecture: TLecture) => {
    setSelectedLecture(lecture);
  };

  const renderContent = () => {
    if (isLoading && isInitialLoading) {
      return <Loader className="align-screen-center" size={24} />;
    }

    if (lecturesList.length > 0) {
      return (
        <>
          {selectedLecture && (
            <Breadcrumbs
              paths={[
                {label: 'Courses', url: PATH_COURSES},
                {label: selectedLecture.course.name},
                {label: selectedLecture.name},
              ]}
            />
          )}
          <Row>
            <Col size={7}>{selectedLecture && <LectureVideoPlayer lecture={selectedLecture} />}</Col>
            <Col size={5}>
              <S.H3>Lectures</S.H3>
              <InfiniteScroll dataLength={lecturesList.length} hasMore={hasMore} next={fetchMoreLectures}>
                {lecturesList.map((lecture, index) => (
                  <Lecture
                    index={index}
                    isSelected={selectedLecture && lecture.id === selectedLecture.id}
                    key={index}
                    lecture={lecture}
                    onClick={onLectureClick}
                  />
                ))}
              </InfiniteScroll>
            </Col>
          </Row>
        </>
      );
    }

    return <EmptyPage bottomText="No lectures to display." graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Lectures;
