import AuthButtons from 'components/AuthButtons';
import {SFC} from 'types';
import {analyticsArea} from 'utils/analyticsAttributes';

import * as S from './Styles';

// Introduces the site to signed-out visitors, for many of them the feed is the first page they see
const Welcome: SFC = ({className}) => {
  return (
    <S.Container {...analyticsArea('welcome')} className={className}>
      <S.Heading>Welcome to thenewboston</S.Heading>
      <S.Text>
        A social network with its own economy. Share posts, send coins to other members, create your own currency, trade
        on the exchange, and play Connect 5 or backgammon.
      </S.Text>
      <AuthButtons />
    </S.Container>
  );
};

export default Welcome;
