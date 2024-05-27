import {SFC} from 'types';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Center>
        <ToolbarMenuLink text="Home" to="/contributions/home" />
        <ToolbarMenuLink text="Learn More" to="/contributions/learn-more" />
      </S.Center>
    </S.Container>
  );
};
export default Toolbar;
