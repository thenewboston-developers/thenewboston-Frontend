import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import LectureVideoPlayer from 'components/University/Lectures/LectureVideoPlayer';
import Lecture from 'components/University/Lectures/Lecture';
import {Row, Col} from 'styles/components/GridStyle';
import {getLectures as _getLectures, resetLectures} from 'dispatchers/lectures';
import {getLectures, hasMoreLectures, isLoadingLectures} from 'selectors/state';
import {AppDispatch, SFC, Lecture as TLecture} from 'types';
import {displayErrorToast} from 'utils/toasts';
import * as S from './Styles';

const Lectures: SFC = ({className}) => {
  const [selectedLecture, setSelectedLecture] = useState<TLecture | undefined>();
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMoreLectures);
  const isLoading = useSelector(isLoadingLectures);
  const lectures = useSelector(getLectures);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const course_id = queryParams.get('course_id') || undefined;

  const lecturesList = useMemo(() => Object.values(lectures), [lectures]);

  useEffect(() => {
    const initFetch = async () => {
      try {
        dispatch(resetLectures());
        await dispatch(_getLectures({course_id: course_id}));
      } catch (error) {
        console.error(error);
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
        await dispatch(_getLectures({course_id: course_id}));
      } catch (error) {
        console.error(error);
        displayErrorToast('Failed to load more lectures');
      }
    }
  };

  const renderContent = () => {
    if (lecturesList.length > 0) {
      return (
        <Row>
          <Col size={7}>{selectedLecture && <LectureVideoPlayer lecture={selectedLecture} />}</Col>
          <Col size={5}>
            <S.H3>Lectures</S.H3>
            <InfiniteScroll dataLength={lecturesList.length} hasMore={hasMore} next={fetchMoreLectures}>
              {lecturesList.map((lecture, index) => (
                <Lecture key={index} lecture={lecture} />
              ))}
            </InfiniteScroll>
          </Col>
        </Row>
      );
    }

    return <EmptyPage bottomText="No lectures to display." graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Lectures;
