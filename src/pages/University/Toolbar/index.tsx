import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {PATH_COURSES, PATH_COURSES_SELF} from 'constants/paths';
import {SFC} from 'types';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.Center>
        <ToolbarMenuLink text="Browse Courses" to={PATH_COURSES} />
        <ToolbarMenuLink text="My Courses" to={PATH_COURSES_SELF} />
      </S.Center>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
