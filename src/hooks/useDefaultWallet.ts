import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getDefaultWallet} from 'dispatchers/wallets';
import {AppDispatch, Wallet} from 'types';
import {DEFAULT_CORE_TICKER} from 'constants/general';
import {getWallets} from 'selectors/state';
import {displayErrorToast} from 'utils/toasts';

const useDefaultWallet = (): Wallet | undefined => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getDefaultWallet());
      } catch (error) {
        console.error('Failed to fetch default wallet:', error);
        displayErrorToast('Error fetching default wallet');
      }
    })();
  }, [dispatch]);

  const defaultWallets = useSelector(getWallets);

  const defaultWallet = useMemo(() => {
    return Object.values(defaultWallets).find((wallet) => wallet.core.ticker === DEFAULT_CORE_TICKER);
  }, [defaultWallets]);

  return defaultWallet;
};

export default useDefaultWallet;
