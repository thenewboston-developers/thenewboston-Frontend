import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getAssetPairs as _getAssetPairs} from 'dispatchers/assetPairs';
import {useActiveAssetPair} from 'hooks';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const AssetPairSelector: SFC = ({className}) => {
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

    return <S.SelectorButton>{text}</S.SelectorButton>;
  };

  return <S.Container className={className}>{renderSelectorButton()}</S.Container>;
};

export default AssetPairSelector;
