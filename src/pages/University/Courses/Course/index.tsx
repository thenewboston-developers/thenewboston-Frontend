import {mdiCalendarOutline, mdiFileEdit, mdiTrashCan} from '@mdi/js';

import {Course as TCourse, SFC} from 'types';
import {getTimeAgo} from 'utils/dates';
import {PATH_LECTURES, PATH_LECTURES_SELF} from 'constants/paths';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import Badge, {BadgeStyle} from 'components/Badge';
import CourseDeleteModal from 'modals/CourseDeleteModal';
import CourseModal from 'modals/CourseModal';
import ReadMoreLess from 'components/ReadMoreLess';

import * as S from './Styles';
import {colors} from 'styles';

export interface CourseProps {
  course: TCourse;
  selfCourse?: boolean;
}

const Course: SFC<CourseProps> = ({className, course, selfCourse = false}) => {
  const [courseDeleteModalIsOpen, toggleCourseDeleteModal] = useToggle(false);
  const [courseModalIsOpen, toggleCourseModal] = useToggle(false);

  const {created_date, description, publication_status, name, thumbnail, instructor} = course;

  const renderActionButtons = () => {
    if (selfCourse) {
      const badgeStyle = {
        [PublicationStatus.PUBLISHED]: BadgeStyle.success,
        [PublicationStatus.DRAFT]: BadgeStyle.warning,
      };

      return (
        <S.ActionButtonsContainer>
          <div>
            <Badge badgeStyle={badgeStyle[publication_status]} children={publication_status} />
          </div>
          <div>
            <span onClick={toggleCourseModal}>
              <S.Icon path={mdiFileEdit} size={1} color="skyblue" />
            </span>
            <span onClick={toggleCourseDeleteModal}>
              <S.Icon path={mdiTrashCan} size={1} color="red" />
            </span>
          </div>
        </S.ActionButtonsContainer>
      );
    }
    return null;
  };

  const renderContent = () => {
    return (
      <S.ContentContainer>
        {renderActionButtons()}
        <S.Img alt="image" src={thumbnail} />
        <S.Content>
          <div>
            <S.Link to={`${selfCourse ? PATH_LECTURES_SELF : PATH_LECTURES}?course_id=${course.id}`}>
              <S.Name>{name}</S.Name>
            </S.Link>
            <S.Description>
              <ReadMoreLess text={description} maxLength={80} />
            </S.Description>
          </div>
        </S.Content>
        <S.Footer>
          <S.FooterItem $gap={12}>
            <S.UserLabel
              avatar={instructor.avatar}
              description="Course Instructor"
              id={instructor.id}
              username={instructor.username}
            />
          </S.FooterItem>
          <S.FooterItem $gap={6}>
            <S.Icon path={mdiCalendarOutline} color={colors.gray} size={'20px'} />
            <S.TimeText>{getTimeAgo(created_date)}</S.TimeText>
          </S.FooterItem>
        </S.Footer>
      </S.ContentContainer>
    );
  };

  const renderCourseDeleteModal = () => {
    return courseDeleteModalIsOpen ? <CourseDeleteModal courseId={course.id} close={toggleCourseDeleteModal} /> : null;
  };

  const renderCourseModal = () => {
    return courseModalIsOpen ? <CourseModal course={course} close={toggleCourseModal} /> : null;
  };

  return (
    <>
      <S.Container className={className}>
        {renderContent()}
        {renderCourseModal()}
        {renderCourseDeleteModal()}
      </S.Container>
    </>
  );
};

export default Course;
