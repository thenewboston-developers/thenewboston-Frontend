import {mdiCalendarOutline} from '@mdi/js';
import Icon from '@mdi/react';

import ReadMoreLess from 'components/ReadMoreLess';
import {Course as TCourse, SFC} from 'types';
import {PATH_LECTURES} from 'constants/paths';
import {getTimeAgo} from 'utils/dates';

import * as S from './Styles';

export interface CourseProps {
  course: TCourse;
}

const Course: SFC<CourseProps> = ({className, course}) => {
  const {instructor, name, description, thumbnail, created_date} = course;

  return (
    <>
      <S.Container className={className}>
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
      </S.Container>
    </>
  );
};

export default Course;
