import {Lecture as TLecture} from 'types';
import {mdiCalendarOutline} from '@mdi/js';
import Icon from '@mdi/react';

import {getTimeAgo} from 'utils/dates';
import ReadMoreLess from 'components/ReadMoreLess';
import * as S from './Styles';

export interface LectureProps {
  lecture: TLecture;
}

const Lecture: React.FC<LectureProps> = ({lecture}) => {
  const {name, description, thumbnail_url, created_date} = lecture;

  return (
    <S.Container>
      <S.Img alt={`${name} thumbnail`} src={thumbnail_url} />
      <S.Content>
        <S.Name>{name}</S.Name>
        <S.Description>
          <ReadMoreLess text={description} maxLength={100} />
        </S.Description>
        <S.Footer>
          <S.FooterItem>
            <Icon path={mdiCalendarOutline} size={1} />
            {getTimeAgo(created_date)}
          </S.FooterItem>
        </S.Footer>
      </S.Content>
    </S.Container>
  );
};
export default Lecture;
