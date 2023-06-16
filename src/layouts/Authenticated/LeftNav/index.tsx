import {useDispatch} from 'react-redux';

import {logout} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <S.Container className={className}>
      <h1>Left Nav</h1>
      <div onClick={() => dispatch(logout())}>Log out</div>
    </S.Container>
  );
};

export default LeftNav;
