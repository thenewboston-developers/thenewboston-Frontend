import {useActiveAssetPair, useToggle} from 'hooks';
import AssetPairSelectModal from 'modals/AssetPairSelectModal';
import {SFC} from 'types';
import * as S from './Styles';

const AssetPairSelector: SFC = ({className}) => {
  const [assetPairSelectModalIsOpen, toggleAssetPairSelectModal] = useToggle(false);
  const activeAssetPair = useActiveAssetPair();

  const renderSelectorButton = () => {
    const text = activeAssetPair
      ? `${activeAssetPair.primary_currency.ticker}-${activeAssetPair.secondary_currency.ticker}`
      : 'Select Asset Pair';

    return <S.SelectorButton onClick={toggleAssetPairSelectModal}>{text}</S.SelectorButton>;
  };

  return (
    <>
      <S.Container className={className}>{renderSelectorButton()}</S.Container>
      {assetPairSelectModalIsOpen ? <AssetPairSelectModal close={toggleAssetPairSelectModal} /> : null}
    </>
  );
};

export default AssetPairSelector;
