import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import LectureVideoPlayer from 'components/University/Lectures/LectureVideoPlayer';
import {Row, Col} from 'styles/components/GridStyle';
import {getLectures as fetchLectures, resetLectures} from 'dispatchers/lectures';
import {getLectures, hasMoreLectures, isLoadingLectures} from 'selectors/state';
import {AppDispatch, SFC, Lecture} from 'types';
import {displayErrorToast} from 'utils/toasts';
import * as S from './Styles';

const Lectures: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedLecture, setSelectedLecture] = useState<Lecture | undefined>();
  const lectures = useSelector(getLectures);
  const hasMore = useSelector(hasMoreLectures);
  const isLoading = useSelector(isLoadingLectures);

  const lecturesList = useMemo(() => Object.values(lectures), [lectures]);

  useEffect(() => {
    const initFetch = async () => {
      try {
        dispatch(resetLectures());
        await dispatch(fetchLectures());
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching lectures');
      }
    };

    initFetch();
  }, [dispatch]); // Removed lecturesList from dependencies

  useEffect(() => {
    if (lecturesList.length > 0) {
      setSelectedLecture(lecturesList[0]);
    }
  }, [lecturesList]);

  const fetchMoreLectures = async () => {
    if (!isLoading && hasMore) {
      try {
        await dispatch(fetchLectures());
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
            <InfiniteScroll dataLength={lecturesList.length} hasMore={hasMore} next={fetchMoreLectures}>
              <Row>
                {lecturesList.map((lecture, index) => (
                  <div key={index}>{JSON.stringify(lecture)}</div>
                ))}
              </Row>
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
