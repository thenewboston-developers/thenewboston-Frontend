import {SFC} from 'types';
import * as S from './Styles';

const Home: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
    </S.Container>
  );
};

export default Home;
