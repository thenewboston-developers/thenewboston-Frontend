import CasinoSession from 'components/Casino/Session';

import Hero from '../Hero';
import Rules from '../Rules';
import * as S from '../Styles';
import Table from '../Table';

const Home = () => (
  <S.Container>
    <S.Navigation>
      <S.TextLink to="/games">← All games</S.TextLink>
      <S.Badge>Single-zero wheel · Provably fair</S.Badge>
    </S.Navigation>
    <Hero />
    <CasinoSession>
      <Table />
    </CasinoSession>
    <Rules />
  </S.Container>
);

export default Home;
