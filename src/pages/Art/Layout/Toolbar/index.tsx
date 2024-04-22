import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.Center>
        <ToolbarMenuLink text="Marketplace" to="/art/marketplace" />
        <ToolbarMenuLink text="Create" to="/art/create" />
      </S.Center>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
