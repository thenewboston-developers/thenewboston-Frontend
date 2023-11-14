import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCores, getWallets} from 'selectors/state';
import {Core} from 'types';

const useAvailableWalletCores = (): Core[] => {
  const cores = useSelector(getCores);
  const wallets = useSelector(getWallets);

  const existingWalletCoreIds = useMemo(() => new Set(Object.values(wallets).map(({core}) => core.id)), [wallets]);

  return useMemo(
    () => Object.values(cores).filter(({id}) => !existingWalletCoreIds.has(id)),
    [cores, existingWalletCoreIds],
  );
};

export default useAvailableWalletCores;
