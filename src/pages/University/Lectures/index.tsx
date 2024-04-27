import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {AppDispatch, Lecture as TLecture, SFC} from 'types';
import {Col, Row} from 'styles/components/GridStyle';
import {displayErrorToast} from 'utils/toasts';
import Button from 'components/Button';
import {getLectures as _getLectures, resetLectures} from 'dispatchers/lectures';
import {getLectures as _getLecturesState} from 'selectors/state';
import {getSelf} from 'selectors/state';
import {PATH_COURSES, PATH_COURSES_SELF} from 'constants/paths';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import LectureModal from 'modals/LectureModal';
import Breadcrumbs from 'components/Breadcrumbs';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Lecture from './Lecture';
import LectureVideoPlayer from './LectureVideoPlayer';
import Loader from 'components/Loader';
import * as S from './Styles';

export interface LecturesProps {
  selfLectures?: boolean;
}

const Lectures: SFC<LecturesProps> = ({className, selfLectures = false}) => {
  const [lectureModalIsOpen, toggleLectureModal] = useToggle(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState<TLecture | undefined>();

  const {hasMore, isLoading, lectures} = useSelector(_getLecturesState);
  const self = useSelector(getSelf);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const course_id = queryParams.get('course_id') || undefined;

  const lecturesList = useMemo(() => Object.values(lectures), [lectures]);
  const apiParams = useMemo(() => {
    if (selfLectures && self.id) {
      return {instructor_id: self.id};
    } else {
      return {publication_status: PublicationStatus.PUBLISHED};
    }
  }, [selfLectures, self.id]);

  useEffect(() => {
    const initFetch = async () => {
      try {
        dispatch(resetLectures());
        setIsInitialLoading(true);
        await dispatch(_getLectures({course_id: course_id, ...apiParams}));
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        setIsInitialLoading(false);
        displayErrorToast('Error fetching lectures');
      }
    };

    initFetch();
  }, [apiParams, dispatch, course_id]);

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

  const renderHeadingSection = () => {
    if (selfLectures) {
      return (
        <S.HeadingSection>
          <S.H3>My Lectures</S.H3>
          <Button onClick={toggleLectureModal} text="Add Lecture" />
        </S.HeadingSection>
      );
    }
    return (
      <S.HeadingSection>
        <S.H3>Lectures</S.H3>
      </S.HeadingSection>
    );
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
                selfLectures ? {label: 'My Courses', url: PATH_COURSES_SELF} : {label: 'Courses', url: PATH_COURSES},
                {label: selectedLecture.course.name},
                {label: selectedLecture.name},
              ]}
            />
          )}
          <Row>
            <Col size={7}>{selectedLecture && <LectureVideoPlayer lecture={selectedLecture} />}</Col>
            <Col size={5}>
              {renderHeadingSection()}
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

  return (
    <S.Container className={className}>
      {renderContent()}
      {lectureModalIsOpen ? <LectureModal close={toggleLectureModal} course_id={course_id} /> : null}
    </S.Container>
  );
};

export default Lectures;
