import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppDispatch, Wallet} from 'types';
import {DEFAULT_CORE_TICKER} from 'constants/general';
import {displayErrorToast} from 'utils/toasts';
import {getDefaultWallet} from 'dispatchers/wallets';
import {getWallets} from 'selectors/state';

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

  const wallets = useSelector(getWallets);

  const defaultWallet = useMemo(() => {
    return Object.values(wallets).find((wallet) => wallet.core.ticker === DEFAULT_CORE_TICKER);
  }, [wallets]);

  return defaultWallet;
};

export default useDefaultWallet;
