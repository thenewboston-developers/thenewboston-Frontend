import {mdiChatProcessingOutline, mdiCurrencyUsd, mdiStarFourPoints} from '@mdi/js';
import Icon from '@mdi/react';

import logo from 'assets/logo192.png';
import AuthButtons from 'components/AuthButtons';
import {SFC} from 'types';
import {analyticsArea} from 'utils/analyticsAttributes';

import * as S from './Styles';

// Introduces the site to signed-out visitors, for many of them the feed is the first page they see
const Welcome: SFC = ({className}) => {
  return (
    <S.Container {...analyticsArea('welcome')} className={className}>
      <S.Content>
        <S.Eyebrow>Connect. Create. Play.</S.Eyebrow>
        <S.Heading>
          <S.Greeting>Welcome to</S.Greeting> thenewboston
        </S.Heading>
        <S.Text>
          A social network with its own economy. Share ideas, trade coins, create your own currency, and play.
        </S.Text>
        <AuthButtons />
      </S.Content>
      <S.Artwork aria-hidden="true">
        <S.Orbit />
        <S.LogoTile>
          <S.Logo alt="" height="192" src={logo} width="192" />
        </S.LogoTile>
        <S.ChatSatellite>
          <Icon path={mdiChatProcessingOutline} size={1} />
        </S.ChatSatellite>
        <S.CoinSatellite>
          <Icon path={mdiCurrencyUsd} size={1} />
        </S.CoinSatellite>
        <S.Spark>
          <Icon path={mdiStarFourPoints} size={0.75} />
        </S.Spark>
      </S.Artwork>
    </S.Container>
  );
};

export default Welcome;
