import {SFC} from 'types';
import * as S from './Styles';

const AssetPairSelector: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.SelectorButton>VTX-TNB</S.SelectorButton>
    </S.Container>
  );
};

export default AssetPairSelector;
