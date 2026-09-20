import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';

import {isPathActive} from 'layouts/Authenticated/utils';
import {SFC} from 'types';

import * as S from './Styles';

export interface MenuItemProps {
  activeIcon?: string;
  children?: ReactNode;
  icon: string;
  rootPath: string;
  text: string;
  to: string;
}

const MenuItem: SFC<MenuItemProps> = ({activeIcon, children, className, icon, rootPath, text, to}) => {
  const location = useLocation();

  const isActive = isPathActive(location.pathname, rootPath);

  return (
    <S.MenuItem $isActive={isActive} aria-current={isActive ? 'page' : undefined} className={className} to={to}>
      <S.IconWrapper>
        <S.Icon path={isActive && activeIcon ? activeIcon : icon} size="24px" />
        {children}
      </S.IconWrapper>
      <S.Text>{text}</S.Text>
    </S.MenuItem>
  );
};

export default MenuItem;
