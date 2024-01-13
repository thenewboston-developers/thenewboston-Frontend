import {useNavigate, useParams} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

export interface MenuItemProps {
  id: number;
  name: string;
}

const MenuItem: SFC<MenuItemProps> = ({className, id, name}) => {
  const navigate = useNavigate();
  const params = useParams();

  const conversationId = params.id ? parseInt(params.id, 10) : null;

  const handleClick = () => {
    navigate(`/ia/${id}`);
  };

  return (
    <S.Container $isActive={id === conversationId} className={className} onClick={handleClick}>
      <S.Text>{name}</S.Text>
    </S.Container>
  );
};

export default MenuItem;
