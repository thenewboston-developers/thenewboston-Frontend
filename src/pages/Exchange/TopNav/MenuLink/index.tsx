import {useLocation} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

export interface MenuLinkProps {
  text: string;
  to: string;
}

const MenuLink: SFC<MenuLinkProps> = ({className, text, to}) => {
  const location = useLocation();

  return (
    <S.Container $isActive={location.pathname === to} className={className} to={to}>
      {text}
    </S.Container>
  );
};

export default MenuLink;
