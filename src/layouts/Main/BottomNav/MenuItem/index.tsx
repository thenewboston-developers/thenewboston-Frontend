import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';
import {LucideIcon} from 'lucide-react';

import {BOTTOM_NAV_ICON_SIZE} from 'layouts/Main/mixins';
import {isPathActive} from 'layouts/Main/utils';
import {SFC} from 'types';
import {analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

export interface MenuItemProps {
  children?: ReactNode;
  icon: LucideIcon;
  rootPath: string;
  text: string;
  to: string;
}

const MenuItem: SFC<MenuItemProps> = ({children, className, icon: Icon, rootPath, text, to}) => {
  const location = useLocation();

  const isActive = isPathActive(location.pathname, rootPath);

  return (
    <S.MenuItem
      {...analyticsTarget(text)}
      $isActive={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      to={to}
    >
      <S.IconWrapper $isActive={isActive}>
        <Icon aria-hidden size={BOTTOM_NAV_ICON_SIZE} strokeWidth={isActive ? 2 : 1.75} />
        {children}
      </S.IconWrapper>
      <S.Text>{text}</S.Text>
    </S.MenuItem>
  );
};

export default MenuItem;
