import React, {FC} from 'react';

import Icon from '@mdi/react';
import {Lecture as TLecture} from 'types';
import {mdiCalendarOutline} from '@mdi/js';

import ReadMoreLess from 'components/ReadMoreLess';
import {getTimeAgo} from 'utils/dates';
import * as S from './Styles';

export interface LectureProps {
  index: number;
  isSelected?: boolean;
  lecture: TLecture;
  onClick: (lecture: TLecture) => void;
}

const Lecture: FC<LectureProps> = ({index, lecture, onClick, isSelected = false}) => {
  const {name, description, thumbnail_url, created_date} = lecture;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick(lecture);
  };

  return (
    <S.Container selected={isSelected}>
      <S.LectureNumber>{index + 1}</S.LectureNumber>
      <S.Img alt={`${name} thumbnail`} src={thumbnail_url} onClick={handleClick} />
      <S.Content>
        <S.Name onClick={handleClick}>{name}</S.Name>
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
