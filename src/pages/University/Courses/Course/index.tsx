import {mdiCalendarOutline, mdiFileEdit, mdiTrashCan} from '@mdi/js';
import Icon from '@mdi/react';

import {Course as TCourse, SFC} from 'types';
import {getTimeAgo} from 'utils/dates';
import {PATH_LECTURES} from 'constants/paths';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import CourseModal from 'modals/CourseModal';
import Badge, {BadgeStyle} from 'components/Badge';
import ReadMoreLess from 'components/ReadMoreLess';

import * as S from './Styles';

export interface CourseProps {
  course: TCourse;
  selfCourse?: boolean;
}

const Course: SFC<CourseProps> = ({className, course, selfCourse = false}) => {
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
            <Badge badgeStyle={badgeStyle[publication_status]} text={publication_status} />
          </div>
          <div>
            <span onClick={toggleCourseModal}>
              <S.Icon path={mdiFileEdit} size={1} color="skyblue" />
            </span>
            <span>
              <S.Icon path={mdiTrashCan} size={1} color="red" />
            </span>
          </div>
        </S.ActionButtonsContainer>
      );
    }
    return null;
  };

  return (
    <>
      <S.Container className={className}>
        {renderActionButtons()}
        <S.Img alt="image" src={thumbnail} />
        <S.Content>
          <S.Link to={`${PATH_LECTURES}?course_id=${course.id}`}>
            <S.Name>{name}</S.Name>
          </S.Link>
          <S.Description>
            <ReadMoreLess text={description} maxLength={100} />
          </S.Description>
          <S.Footer>
            <S.FooterItem>
              <S.UserLabel
                avatar={instructor.avatar}
                description="Course Instructor"
                id={instructor.id}
                username={instructor.username}
              />
            </S.FooterItem>
            <S.FooterItem>
              <Icon path={mdiCalendarOutline} size={1} />
              {getTimeAgo(created_date)}
            </S.FooterItem>
          </S.Footer>
        </S.Content>
        {courseModalIsOpen ? <CourseModal course={course} close={toggleCourseModal} /> : null}
      </S.Container>
    </>
  );
};

export default Course;
