import {Lecture as TLecture, SFC} from 'types';
import {mdiCalendarOutline} from '@mdi/js';
import Icon from '@mdi/react';

import {longDate} from 'utils/dates';
import YoutubeVideo from 'components/YoutubeVideo';
import * as S from './Styles';

export interface LectureVideoPlayerProps {
  lecture: TLecture;
}

const LectureVideoPlayer: SFC<LectureVideoPlayerProps> = ({className, lecture}) => {
  const {course, name, description, created_date, youtube_id} = lecture;

  return (
    <>
      <S.Container className={className}>
        <YoutubeVideo title={name} youtubeID={youtube_id} />
        <S.Content>
          <S.Name>{name}</S.Name>
          <S.Description>{description}</S.Description>
          <S.Footer>
            <S.FooterItem>
              <S.UserLabel
                avatar={course.instructor.avatar}
                description="Course Instructor"
                id={course.instructor.id}
                username={course.instructor.username}
              />
            </S.FooterItem>
            <S.FooterItem>
              <Icon path={mdiCalendarOutline} size={1} />
              {longDate(created_date)}
            </S.FooterItem>
          </S.Footer>
        </S.Content>
      </S.Container>
    </>
  );
};

export default LectureVideoPlayer;
