import {AssetPair, GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

interface RadioCardProps {
  activeAssetPairId: number | null;
  assetPair: AssetPair;
  handleRadioCardClick: GenericVoidFunction;
}

const RadioCard: SFC<RadioCardProps> = ({activeAssetPairId, assetPair, className, handleRadioCardClick}) => {
  return (
    <S.Container
      $isActive={activeAssetPairId === assetPair.id}
      className={className}
      key={assetPair.id}
      onClick={handleRadioCardClick}
    >
      {assetPair.primary_currency.ticker}-{assetPair.secondary_currency.ticker}
    </S.Container>
  );
};

export default RadioCard;
