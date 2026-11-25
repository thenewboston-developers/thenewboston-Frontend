import {Navigate, Route, useLocation} from 'react-router-dom';

import CasinoSession from 'components/Casino/Session';
import SentryRoutes from 'components/SentryRoutes';

import Machine from './Machine';
import * as S from './Styles';

const Home = () => (
  <S.Container>
    <S.Content>
      <S.Navigation>
        <S.TextLink to="/games">← All games</S.TextLink>
        <S.Badge>JACKS OR BETTER · VERIFIABLE HANDS</S.Badge>
      </S.Navigation>
      <S.Header>
        <S.Eyebrow>The thenewboston casino</S.Eyebrow>
        <h1>Video Poker</h1>
        <p>Five cards, one draw. Hold the right ones and make the best poker hand.</p>
      </S.Header>
      <CasinoSession>
        <Machine />
      </CasinoSession>
    </S.Content>
  </S.Container>
);

const VideoPoker = () => {
  const {hash, search} = useLocation();
  return (
    <SentryRoutes>
      <Route element={<Home />} path="/home" />
      <Route element={<Navigate replace to={{pathname: '/video-poker/home', search, hash}} />} path="*" />
    </SentryRoutes>
  );
};

export default VideoPoker;
