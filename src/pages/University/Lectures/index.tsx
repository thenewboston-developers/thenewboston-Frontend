import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
import Breadcrumbs from 'components/Breadcrumbs';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import Loader from 'components/Loader';
import {PATH_COURSES, PATH_COURSES_SELF, PATH_LECTURES} from 'constants/paths';
import {getLectures as _getLectures, resetLectures} from 'dispatchers/lectures';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import LectureModal from 'modals/LectureModal';
import {getLectures as _getLecturesState, getSelf} from 'selectors/state';
import {Col, Row} from 'styles/components/GridStyle';
import {AppDispatch, Lecture as TLecture, Lecture as LectureFind, SFC} from 'types';
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
  const course_id = queryParams.get('course_id') || undefined;
  const lecture_id = queryParams.get('lecture_id') || undefined;

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
        await dispatch(_getLectures({course_id: course_id, ...apiParams}));
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        setIsInitialLoading(false);
        displayErrorToast('Error fetching lectures');
      }
    })();
  }, [apiParams, dispatch, course_id]);

  useEffect(() => {
    if (lecturesList.length > 0) {
      if (lecture_id) {
        const foundLecture = lecturesList.find((lecture: LectureFind) => lecture.id === Number(lecture_id));
        setSelectedLecture(foundLecture);
      } else {
        const courseId = lecturesList[0].course.id;
        const lectureId = lecturesList[0].id;
        navigate({
          pathname: `${PATH_LECTURES}`,
          search: `?course_id=${courseId}&lecture_id=${lectureId}`,
        });
        setSelectedLecture(lecturesList[0]);
      }
    }
  }, [lecturesList, lecture_id, navigate]);

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

    const courseId = lecture.course.id;
    const lectureId = lecture.id;

    navigate({
      pathname: `${PATH_LECTURES}`,
      search: `?course_id=${courseId}&lecture_id=${lectureId}`,
    });
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
    return lectureModalIsOpen ? <LectureModal close={toggleLectureModal} course_id={course_id} /> : null;
  };

  return (
    <S.Container className={className}>
      {renderContent()}
      {renderLectureModal()}
    </S.Container>
  );
};

export default Lectures;
