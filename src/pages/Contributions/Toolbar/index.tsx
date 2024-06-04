import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {PATH_CONTRIBUTIONS, PATH_CONTRIBUTIONS_SELF} from 'constants/paths';
import {SFC} from 'types';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.Center>
        <ToolbarMenuLink text="Home" to={PATH_CONTRIBUTIONS} />
        <ToolbarMenuLink text="My Contributions" to={PATH_CONTRIBUTIONS_SELF} />
      </S.Center>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
