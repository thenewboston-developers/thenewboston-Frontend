import Skeleton from 'components/Skeleton';
import {SFC} from 'types';

import * as S from './Styles';

const CurrencyCardSkeleton: SFC = ({className}) => {
  return (
    <S.Container aria-hidden="true" className={className}>
      <S.Body>
        <S.Header>
          <Skeleton circle height={56} width={56} />
          <S.HeaderText>
            <Skeleton height={18} width={96} />
            <Skeleton height={14} width={140} />
          </S.HeaderText>
        </S.Header>
        <S.Description>
          <Skeleton height={14} width="100%" />
          <Skeleton height={14} width="70%" />
        </S.Description>
      </S.Body>
      <S.Footer>
        <S.Owner>
          <Skeleton circle height={44} width={44} />
          <S.OwnerText>
            <Skeleton height={14} width={88} />
            <Skeleton height={12} width={48} />
          </S.OwnerText>
        </S.Owner>
        <S.Dates>
          <Skeleton height={12} width={120} />
          <Skeleton height={12} width={120} />
        </S.Dates>
      </S.Footer>
    </S.Container>
  );
};

export default CurrencyCardSkeleton;
