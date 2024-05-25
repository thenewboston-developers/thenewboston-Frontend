import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Center>
        <ToolbarMenuLink text="Home" to="/currencies/home" />
        <ToolbarMenuLink text="Learn More" to="/currencies/learn-more" />
      </S.Center>
    </S.Container>
  );
};

export default Toolbar;
