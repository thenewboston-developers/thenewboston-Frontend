import {useActiveAssetPair, useToggle} from 'hooks';
import SelectAssetPairModal from 'modals/SelectAssetPairModal';
import {SFC} from 'types';
import * as S from './Styles';

const AssetPairSelector: SFC = ({className}) => {
  const [selectAssetPairModalIsOpen, toggleSelectAssetPairModal] = useToggle(false);
  const activeAssetPair = useActiveAssetPair();

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
