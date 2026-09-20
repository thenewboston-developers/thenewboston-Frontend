import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';

import {isPathActive} from 'layouts/Authenticated/utils';
import {SFC} from 'types';

import useIsRail from '../useIsRail';

import * as S from './Styles';

export interface MenuLinkProps {
  activeIcon?: string;
  children?: ReactNode;
  icon: string;
  rootPath: string;
  text: string;
  to: string;
}

const MenuLink: SFC<MenuLinkProps> = ({activeIcon, children, className, icon, rootPath, text, to}) => {
  const isRail = useIsRail();
  const location = useLocation();

  const isActive = isPathActive(location.pathname, rootPath);

  return (
    <S.MenuLink
      $isActive={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      title={isRail ? text : undefined}
      to={to}
    >
      <S.Icon path={isActive && activeIcon ? activeIcon : icon} size="22px" />
      {text && <S.Text>{text}</S.Text>}
      {children}
    </S.MenuLink>
  );
};

export default MenuLink;
