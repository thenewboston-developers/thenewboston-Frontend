import {useSelector} from 'react-redux';

import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  const self = useSelector(getSelf);

  return (
    <S.Container className={className}>
      <S.Left>
        <S.MenuItems $isCentered={!self.is_staff}>
          <ToolbarMenuLink text="Home" to="/bonsai/home" />
          <ToolbarMenuLink text="Learn More" to="/bonsai/learn-more" />
          {self.is_staff ? <ToolbarMenuLink text="Manage" to="/bonsai/manage" /> : null}
        </S.MenuItems>
      </S.Left>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
