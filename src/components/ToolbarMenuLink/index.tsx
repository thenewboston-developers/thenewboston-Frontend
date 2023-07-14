import {useLocation} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

export interface ToolbarMenuLinkProps {
  text: string;
  to: string;
}

const ToolbarMenuLink: SFC<ToolbarMenuLinkProps> = ({className, text, to}) => {
  const location = useLocation();

  return (
    <S.Container $isActive={location.pathname === to} className={className} to={to}>
      {text}
    </S.Container>
  );
};

export default ToolbarMenuLink;
