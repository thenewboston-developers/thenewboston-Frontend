import {useDispatch, useSelector} from 'react-redux';

import {useActiveAssetPair} from 'hooks';
import {getAssetPairs, getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';

import * as S from './Styles';

const AssetPairSelector: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const assetPairs = useSelector(getAssetPairs);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const updatedAssetsParis = Object.entries(assetPairs);

  const handleOptionClick = (assetPairId: number) => {
    dispatch(updateManager({activeAssetPairId: assetPairId === manager.activeAssetPairId ? null : assetPairId}));
  };

  return (
    <S.Container className={className}>
      <S.ImageContainer>
        <S.Image height={20} src={activeAssetPair?.primary_currency.logo} width={20} />
      </S.ImageContainer>
      <S.Select onChange={(e) => handleOptionClick(+e.target.value)} value={manager.activeAssetPairId || ''}>
        {updatedAssetsParis.map((assetsValue, index) => {
          return (
            <option key={index} value={assetsValue[1].id}>
              {assetsValue[1].primary_currency.ticker}
            </option>
          );
        })}
      </S.Select>
    </S.Container>
  );
};

export default AssetPairSelector;
