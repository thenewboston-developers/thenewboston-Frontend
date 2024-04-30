import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.Center>
        <ToolbarMenuLink text="Browse Courses" to="/university/courses" />
        <ToolbarMenuLink text="My Courses" to="/university/self" />
      </S.Center>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
