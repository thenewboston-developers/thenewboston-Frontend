import {useSelector} from 'react-redux';

import {getManager, getAssetPairs} from 'selectors/state';
import {AssetPair} from 'types';

const useActiveAssetPair = (): AssetPair | null => {
  const assetPairs = useSelector(getAssetPairs);
  const manager = useSelector(getManager);

  return manager.activeAssetPairId && assetPairs[manager.activeAssetPairId]
    ? assetPairs[manager.activeAssetPairId]
    : null;
};

export default useActiveAssetPair;
