import {useLocation} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

export interface MenuLinkProps {
  children?: React.ReactNode;
  icon: string;
  rootPath: string;
  text: string;
  to: string;
}

const MenuLink: SFC<MenuLinkProps> = ({className, children, icon, rootPath, text, to}) => {
  const location = useLocation();

  return (
    <S.MenuLink $isActive={location.pathname.includes(rootPath)} className={className} to={to}>
      <S.Icon path={icon} size="26px" />
      {text && <S.Text>{text}</S.Text>}
      {children}
    </S.MenuLink>
  );
};

export default MenuLink;
