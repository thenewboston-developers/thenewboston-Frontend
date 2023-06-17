import CoreLabel from 'components/CoreLabel';
import {Core, SFC} from 'types';
import * as S from './Styles';

export interface CoreCardProps {
  core: Core;
}

const CoreCard: SFC<CoreCardProps> = ({className, core}) => {
  return (
    <S.Container className={className}>
      <CoreLabel domain={core.domain} logo={core.logo} ticker={core.ticker} />
    </S.Container>
  );
};

export default CoreCard;
