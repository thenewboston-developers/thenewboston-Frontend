import logo from 'assets/logo192.png';
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
        <S.AuthButtons />
      </S.Content>
      <S.Artwork aria-hidden="true">
        <S.LogoStack>
          <S.Logo alt="" height="192" src={logo} width="192" />
        </S.LogoStack>
      </S.Artwork>
    </S.Container>
  );
};

export default Welcome;
