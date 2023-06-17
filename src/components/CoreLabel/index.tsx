import CoreLogo from 'components/CoreLogo';
import {SFC} from 'types';
import * as S from './Styles';

export interface CoreLabelProps {
  domain: string;
  logo: string | null;
  ticker: string;
}

const CoreLabel: SFC<CoreLabelProps> = ({className, domain, logo, ticker}) => {
  return (
    <S.Container className={className}>
      <CoreLogo logo={logo} />
      <S.Text>
        <S.Ticker>{ticker}</S.Ticker>
        <S.Domain>{domain}</S.Domain>
      </S.Text>
    </S.Container>
  );
};

export default CoreLabel;
