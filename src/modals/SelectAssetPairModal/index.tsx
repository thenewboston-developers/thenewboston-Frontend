import {useDispatch, useSelector} from 'react-redux';

import {getAssetPairs, getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import RadioCard from './RadioCard';
import * as S from './Styles';

export interface SelectAssetPairModalProps {
  close(): void;
}

const SelectAssetPairModal: SFC<SelectAssetPairModalProps> = ({className, close}) => {
  const assetPairs = useSelector(getAssetPairs);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const handleRadioCardClick = (assetPairId: number) => {
    dispatch(updateManager({activeAssetPairId: assetPairId === manager.activeAssetPairId ? null : assetPairId}));
  };

  const renderRadioCards = () => {
    return Object.values(assetPairs).map((assetPair) => (
      <RadioCard
        activeAssetPairId={manager.activeAssetPairId}
        assetPair={assetPair}
        handleRadioCardClick={() => handleRadioCardClick(assetPair.id)}
        key={assetPair.id}
      />
    ));
  };

  return (
    <S.Modal className={className} close={close} header="Select Asset Pair">
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
    </S.Modal>
  );
};

export default SelectAssetPairModal;
