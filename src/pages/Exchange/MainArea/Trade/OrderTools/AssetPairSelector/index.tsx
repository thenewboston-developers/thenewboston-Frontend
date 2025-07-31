import {ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getAssetPairs} from 'selectors/state';
import {AssetPair, SFC} from 'types';

import * as S from './Styles';

interface AssetPairSelectorProps {
  activeAssetPair: AssetPair | null;
}

const AssetPairSelector: SFC<AssetPairSelectorProps> = ({activeAssetPair, className}) => {
  const {assetPairId} = useParams<{assetPairId: string}>();
  const assetPairs = useSelector(getAssetPairs);
  const navigate = useNavigate();
  const updatedAssetPairs = Object.entries(assetPairs);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newAssetPairId = e.target.value;
    navigate(`/exchange/trade/${newAssetPairId}`);
  };

  return (
    <S.Container className={className}>
      <S.Content>
        <S.ImageContainer>
          <S.Image src={activeAssetPair?.primary_currency.logo} />
        </S.ImageContainer>
        <S.Ticker>{activeAssetPair?.primary_currency.ticker}</S.Ticker>
      </S.Content>
      <S.Select id="asset-pair-selector" name="asset-pair-selector" onChange={handleChange} value={assetPairId || ''}>
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
