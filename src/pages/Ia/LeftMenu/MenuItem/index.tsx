import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {getManager} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

export interface MenuItemProps {
  text: string;
}

const MenuItem: SFC<MenuItemProps> = ({className, text}) => {
  const manager = useSelector(getManager);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ia/1`);
  };

  return (
    <S.Container $isActive={manager.activeWalletId === 123} className={className} onClick={handleClick}>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default MenuItem;
