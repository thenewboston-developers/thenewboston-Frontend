import {useDispatch, useSelector} from 'react-redux';

import {useActiveAssetPair, useToggle} from 'hooks';
import AssetPairSelectModal from 'modals/AssetPairSelectModal';
import {getAssetPairs, getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';

import * as S from './Styles';

const AssetPairSelector: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const assetPairs = useSelector(getAssetPairs);
  const updatedAssetsParis = Object.entries(assetPairs);

  const [assetPairSelectModalIsOpen, toggleAssetPairSelectModal] = useToggle(false);
  const activeAssetPair = useActiveAssetPair();

  const handleOptionClick = (assetPairId: number) => {
    dispatch(updateManager({activeAssetPairId: assetPairId === manager.activeAssetPairId ? null : assetPairId}));
  };

  return (
    <>
      <S.Container className={className}>
        <S.ImageStyle>
          <S.Img src={activeAssetPair?.primary_currency.logo} height={20} width={20} />
        </S.ImageStyle>
        <S.Select value={manager.activeAssetPairId || ''} onChange={(e) => handleOptionClick(+e.target.value)}>
          {updatedAssetsParis.map((assetsValue, index) => {
            return (
              <option key={index} value={assetsValue[1].id}>
                {assetsValue[1].primary_currency.ticker}
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
