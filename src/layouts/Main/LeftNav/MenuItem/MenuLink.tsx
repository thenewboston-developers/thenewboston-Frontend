import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';
import {LucideIcon} from 'lucide-react';

import {isPathActive} from 'layouts/Main/utils';
import {SFC} from 'types';
import {analyticsTarget} from 'utils/analyticsAttributes';

import useIsRail from '../useIsRail';

import * as S from './Styles';

export interface MenuLinkProps {
  children?: ReactNode;
  icon: LucideIcon;
  rootPath: string;
  text: string;
  to: string;
}

const MenuLink: SFC<MenuLinkProps> = ({children, className, icon: Icon, rootPath, text, to}) => {
  const isRail = useIsRail();
  const location = useLocation();

  const isActive = isPathActive(location.pathname, rootPath);

  return (
    <S.MenuLink
      {...analyticsTarget(text)}
      $isActive={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      title={isRail ? text : undefined}
      to={to}
    >
      <Icon aria-hidden size={S.ICON_SIZE} strokeWidth={isActive ? 2 : 1.75} />
      {text && <S.Text>{text}</S.Text>}
      {children}
    </S.MenuLink>
  );
};

export default MenuLink;
