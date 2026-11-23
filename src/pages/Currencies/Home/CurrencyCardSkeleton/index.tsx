import Skeleton from 'components/Skeleton';
import {SFC} from 'types';

import * as S from './Styles';

const CurrencyCardSkeleton: SFC = ({className}) => {
  return (
    <S.Container aria-hidden="true" className={className}>
      <S.Header>
        <Skeleton circle height={56} width={56} />
        <S.HeaderText>
          <Skeleton height={18} width={96} />
          <Skeleton height={14} width={64} />
        </S.HeaderText>
      </S.Header>
      <S.Description>
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="60%" />
      </S.Description>
      <S.Footer>
        <S.Owner>
          <Skeleton circle height={28} width={28} />
          <Skeleton height={14} width={88} />
        </S.Owner>
        <Skeleton height={12} width={104} />
      </S.Footer>
    </S.Container>
  );
};

export default CurrencyCardSkeleton;
