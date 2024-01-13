import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiDelete, mdiPencil} from '@mdi/js';

import {SFC} from 'types';
import * as S from './Styles';

export interface MenuItemProps {
  id: number;
  name: string;
}

const MenuItem: SFC<MenuItemProps> = ({className, id, name}) => {
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();

  const conversationId = params.id ? parseInt(params.id, 10) : null;

  const handleClick = () => {
    navigate(`/ia/${id}`);
  };

  const handleDeleteClick = () => {
    console.log('delete');
  };

  const handleEditClick = () => {
    console.log('edit');
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    setToolsVisible(true);
  };

  const renderTools = () => {
    if (!toolsVisible) return null;
    return (
      <S.Tools>
        <S.IconWrapper onClick={handleEditClick}>
          <S.Icon path={mdiPencil} />
        </S.IconWrapper>
        <S.IconWrapper onClick={handleDeleteClick}>
          <S.Icon path={mdiDelete} />
        </S.IconWrapper>
      </S.Tools>
    );
  };

  return (
    <S.Container
      $isActive={id === conversationId}
      className={className}
      onClick={handleClick}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      <S.Text>{name}</S.Text>
      {renderTools()}
    </S.Container>
  );
};

export default MenuItem;
