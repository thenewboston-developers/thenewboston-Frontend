import {ChangeEvent} from 'react';
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
  const updatedAssetPairs = Object.entries(assetPairs);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const assetPairId = +e.target.value;
    dispatch(updateManager({activeAssetPairId: assetPairId === manager.activeAssetPairId ? null : assetPairId}));
  };

  return (
    <S.Container className={className}>
      <S.Content>
        <S.ImageContainer>
          <S.Image src={activeAssetPair?.primary_currency.logo} />
        </S.ImageContainer>
        <S.Ticker>{activeAssetPair?.primary_currency.ticker}</S.Ticker>
      </S.Content>
      <S.Select
        id="asset-pair-selector"
        name="asset-pair-selector"
        onChange={handleChange}
        value={manager.activeAssetPairId || ''}
      >
        {updatedAssetPairs.map((assetsValue, index) => {
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
