import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getAssetPairs as _getAssetPairs} from 'dispatchers/assetPairs';
import {useActiveAssetPair, useToggle} from 'hooks';
import SelectAssetPairModal from 'modals/SelectAssetPairModal';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const AssetPairSelector: SFC = ({className}) => {
  const [selectAssetPairModalIsOpen, toggleSelectAssetPairModal] = useToggle(false);
  const activeAssetPair = useActiveAssetPair();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      await dispatch(_getAssetPairs());
    })();
  }, [dispatch]);

  const renderSelectorButton = () => {
    const text = activeAssetPair
      ? `${activeAssetPair.primary_currency.ticker}-${activeAssetPair.secondary_currency.ticker}`
      : 'Select Asset Pair';

    return <S.SelectorButton onClick={toggleSelectAssetPairModal}>{text}</S.SelectorButton>;
  };

  return (
    <>
      <S.Container className={className}>{renderSelectorButton()}</S.Container>
      {selectAssetPairModalIsOpen ? <SelectAssetPairModal close={toggleSelectAssetPairModal} /> : null}
    </>
  );
};

export default AssetPairSelector;
