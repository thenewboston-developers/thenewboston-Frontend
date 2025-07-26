import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';

import {SFC} from 'types';

import * as S from './Styles';

export interface MenuItemProps {
  children?: ReactNode;
  icon: string;
  rootPath: string;
  text: string;
  to: string;
}

const MenuItem: SFC<MenuItemProps> = ({className, children, icon, rootPath, text, to}) => {
  const location = useLocation();

  return (
    <S.MenuItem $isActive={location.pathname.includes(rootPath)} className={className} to={to}>
      <S.IconWrapper>
        <S.Icon path={icon} size="24px" />
        {children}
      </S.IconWrapper>
      <S.Text>{text}</S.Text>
    </S.MenuItem>
  );
};

export default MenuItem;
