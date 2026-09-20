import {useLocation} from 'react-router-dom';

import {SFC} from 'types';

import * as S from './Styles';

export interface ToolbarMenuLinkProps {
  isMobileDevice?: boolean;
  text: string;
  to: string;
}

const ToolbarMenuLink: SFC<ToolbarMenuLinkProps> = ({className, isMobileDevice = false, text, to}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <S.Container
      $isActive={isActive}
      $isMobileDevice={isMobileDevice}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      to={to}
    >
      {text}
    </S.Container>
  );
};

export default ToolbarMenuLink;
