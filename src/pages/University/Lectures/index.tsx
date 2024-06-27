import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import LeavesEmptyState from 'assets/leaves_empty_state.png';
import Button from 'components/Button';
import Breadcrumbs from 'components/Breadcrumbs';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import Loader from 'components/Loader';
import {PATH_COURSES, PATH_COURSES_SELF} from 'constants/paths';
import {getLectures as _getLectures, resetLectures} from 'dispatchers/lectures';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import LectureModal from 'modals/LectureModal';
import {getLectures as _getLecturesState, getSelf} from 'selectors/state';
import {Col, Row} from 'styles/components/GridStyle';
import {AppDispatch, Lecture as TLecture, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import LectureIcon from './lecture-icon.png';
import Lecture from './Lecture';
import LectureVideoPlayer from './LectureVideoPlayer';
import * as S from './Styles';

export interface LecturesProps {
  selfLectures?: boolean;
}

const Lectures: SFC<LecturesProps> = ({className, selfLectures = false}) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [lectureModalIsOpen, toggleLectureModal] = useToggle(false);
  const [selectedLecture, setSelectedLecture] = useState<TLecture | undefined>();
  const {hasMore, isLoading, lectures} = useSelector(_getLecturesState);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const queryParams = new URLSearchParams(location.search);
  const currentCourseId = queryParams.get('course_id') || undefined;
  const currenLectureId = queryParams.get('lecture_id') || undefined;

  const lecturesList = useMemo(() => Object.values(lectures), [lectures]);

  const apiParams = useMemo(() => {
    if (selfLectures && self.id) {
      return {instructor_id: self.id};
    } else {
      return {publication_status: PublicationStatus.PUBLISHED};
    }
  }, [selfLectures, self.id]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(resetLectures());
        setIsInitialLoading(true);
        await dispatch(_getLectures({course_id: currentCourseId, ...apiParams}));
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        setIsInitialLoading(false);
        displayErrorToast('Error fetching lectures');
      }
    })();
  }, [apiParams, dispatch, currentCourseId]);

  useEffect(() => {
    if (lecturesList.length === 0) {
      return;
    }
    if (currenLectureId) {
      const foundLecture = lecturesList.find((lecture: TLecture) => lecture.id === Number(currenLectureId));
      if (foundLecture) {
        setSelectedLecture(foundLecture);
        return;
      }
    }
    setSelectedLecture(lecturesList[0]);
  }, [lecturesList, currenLectureId]);

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
    updateQueryParam('lecture_id', lecture.id.toString());
  };

  const updateQueryParam = (paramName: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, value);
    navigate(`${location.pathname}?${searchParams.toString()}`, {replace: true});
  };

  const renderSectionHeading = () => {
    if (selfLectures) {
      return (
        <S.SectionHeading>
          <S.H3>My Lectures</S.H3>
          <Button onClick={toggleLectureModal} text="Add Lecture" />
        </S.SectionHeading>
      );
    }
    return (
      <S.SectionHeading>
        <S.LectureAvatar src={LectureIcon} />
        <S.H5>Lectures</S.H5>
      </S.SectionHeading>
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
              <S.Wrapper>
                {renderSectionHeading()}
                <InfiniteScroll
                  dataLength={lecturesList.length}
                  hasMore={hasMore}
                  heightMargin={150}
                  next={fetchMoreLectures}
                >
                  {lecturesList.map((lecture, index) => (
                    <Lecture
                      index={index}
                      isSelected={selectedLecture && lecture.id === selectedLecture.id}
                      key={index}
                      lecture={lecture}
                      onClick={onLectureClick}
                      selfLecture={selfLectures}
                    />
                  ))}
                </InfiniteScroll>
              </S.Wrapper>
            </Col>
          </Row>
        </>
      );
    }

    if (selfLectures) {
      return (
        <EmptyPage
          actionText="Click here to add a new lecture"
          bottomText="No lectures to display."
          graphic={LeavesEmptyState}
          onActionTextClick={toggleLectureModal}
          topText="Nothing here!"
        />
      );
    } else {
      return <EmptyPage bottomText="No lectures to display." graphic={LeavesEmptyState} topText="Nothing here!" />;
    }
  };

  const renderLectureModal = () => {
    return lectureModalIsOpen ? <LectureModal close={toggleLectureModal} course_id={currentCourseId} /> : null;
  };

  return (
    <S.Container className={className}>
      {renderContent()}
      {renderLectureModal()}
    </S.Container>
  );
};

export default Lectures;
