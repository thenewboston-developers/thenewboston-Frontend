import {useActiveAssetPair, useToggle} from 'hooks';
import AssetPairSelectModal from 'modals/AssetPairSelectModal';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import {getAssetPairs, getManager} from 'selectors/state';
import CoreLogo from 'components/CoreLogo';
import Icon from '@mdi/react';
import {mdiArrowRight} from '@mdi/js';
import {updateManager} from 'store/manager';

const AssetPairSelector: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const assetPairs = useSelector(getAssetPairs);
  const updatedAssestParis = Object.entries(assetPairs);

  const [assetPairSelectModalIsOpen, toggleAssetPairSelectModal] = useToggle(false);
  const activeAssetPair = useActiveAssetPair();

  // const renderSelectorButton = () => {
  //   const text = activeAssetPair
  //     ? `${activeAssetPair.primary_currency.ticker}-${activeAssetPair.secondary_currency.ticker}`
  //     : 'Select Asset Pair';

  //   return <S.SelectorButton onClick={toggleAssetPairSelectModal}>{text}</S.SelectorButton>;
  // };

  const handleOptionClick = (assetPairId: number) => {
    dispatch(updateManager({activeAssetPairId: assetPairId === manager.activeAssetPairId ? null : assetPairId}));
  };

  return (
    <>
      {/* <S.Container className={className}>{renderSelectorButton()}</S.Container> */}
      <S.Container className={className}>
        <S.ImageStyle>
          <S.Img src={activeAssetPair?.primary_currency.logo || ''} height={20} width={20} />
          <S.Img src={activeAssetPair?.secondary_currency.logo || ''} height={20} width={20} />
        </S.ImageStyle>
        <S.Select onChange={(e) => handleOptionClick(+e.target.value)}>
          {updatedAssestParis.map(([_, {primary_currency, secondary_currency, id}], index) => {
            return (
              <option key={index} value={id}>
                {primary_currency.ticker} - {secondary_currency.ticker}
              </option>
            );
          })}
        </S.Select>
      </S.Container>

      {assetPairSelectModalIsOpen ? <AssetPairSelectModal close={toggleAssetPairSelectModal} /> : null}
    </>
  );
};

export default AssetPairSelector;
