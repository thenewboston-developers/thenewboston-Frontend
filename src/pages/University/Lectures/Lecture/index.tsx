import {FC, MouseEvent} from 'react';

import {Lecture as TLecture} from 'types';
import {mdiCalendarOutline, mdiFileEdit, mdiTrashCan} from '@mdi/js';
import Icon from '@mdi/react';

import {getTimeAgo} from 'utils/dates';
import {PublicationStatus} from 'enums';
import {useToggle} from 'hooks';
import LectureDeleteModal from 'modals/LectureDeleteModal';
import Badge, {BadgeStyle} from 'components/Badge';
import LectureModal from 'modals/LectureModal';
import ReadMoreLess from 'components/ReadMoreLess';
import * as S from './Styles';

export interface LectureProps {
  index: number;
  isSelected?: boolean;
  lecture: TLecture;
  onClick: (lecture: TLecture) => void;
  selfLecture?: boolean;
}

const Lecture: FC<LectureProps> = ({index, lecture, onClick, isSelected = false, selfLecture = false}) => {
  const [lectureDeleteModalIsOpen, toggleLectureDeleteModal] = useToggle(false);
  const [lectureModalIsOpen, toggleLectureModal] = useToggle(false);

  const {created_date, description, name, publication_status, thumbnail_url} = lecture;

  const renderActionButtons = () => {
    if (selfLecture) {
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
            <span onClick={toggleLectureModal}>
              <S.Icon path={mdiFileEdit} size={1} color="skyblue" />
            </span>
            <span onClick={toggleLectureDeleteModal}>
              <S.Icon path={mdiTrashCan} size={1} color="red" />
            </span>
          </div>
        </S.ActionButtonsContainer>
      );
    }
    return null;
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick(lecture);
  };

  return (
    <S.Container selected={isSelected}>
      <S.LectureNumber>{index + 1}</S.LectureNumber>
      <S.Img alt={`${name} thumbnail`} src={thumbnail_url} onClick={handleClick} />
      <S.Content>
        {renderActionButtons()}
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
      {lectureDeleteModalIsOpen ? <LectureDeleteModal lectureId={lecture.id} close={toggleLectureDeleteModal} /> : null}
      {lectureModalIsOpen ? (
        <LectureModal lecture={lecture} course_id={String(lecture.course.id)} close={toggleLectureModal} />
      ) : null}
    </S.Container>
  );
};

export default Lecture;
