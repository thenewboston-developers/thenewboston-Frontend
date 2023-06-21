import {useLocation} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

export interface MenuLinkProps {
  icon: string;
  text: string;
  to: string;
}

const MenuLink: SFC<MenuLinkProps> = ({className, icon, text, to}) => {
  const location = useLocation();

  return (
    <S.MenuLink $isActive={location.pathname === to} className={className} to={to}>
      <S.Icon path={icon} size="26px" />
      <S.Text>{text}</S.Text>
    </S.MenuLink>
  );
};

export default MenuLink;
