import {useCoreLogo} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

export interface PriceMiniProps {
  coreId: number;
  price: number;
}

const PriceMini: SFC<PriceMiniProps> = ({className, coreId, price}) => {
  const coreLogo = useCoreLogo(coreId);

  return (
    <S.Container className={className}>
      <S.CoreLogo alt="core logo" src={coreLogo} />
      <S.Amount>{price.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default PriceMini;
