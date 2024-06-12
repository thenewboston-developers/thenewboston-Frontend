import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {PATH_CONTRIBUTIONS} from 'constants/paths';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>
        <ToolbarMenuLink text="Home" to={PATH_CONTRIBUTIONS.HOME} />
        <ToolbarMenuLink text="My Contributions" to={PATH_CONTRIBUTIONS.SELF} />
        <ToolbarMenuLink text="Learn More" to={PATH_CONTRIBUTIONS.LEARN_MORE} />
      </S.Left>
    </S.Container>
  );
};

export default Toolbar;
