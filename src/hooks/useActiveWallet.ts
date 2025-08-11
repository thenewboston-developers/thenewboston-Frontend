import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getWallet} from 'dispatchers/wallets';
import {getManager, getWallets} from 'selectors/state';
import {AppDispatch, Wallet} from 'types';

const useActiveWallet = (): Wallet | null => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const wallets = useSelector(getWallets);

  useEffect(() => {
    if (!manager.activeWalletId) return;
    if (wallets[manager.activeWalletId]) return;

    (async () => {
      setIsLoading(true);
      try {
        await dispatch(getWallet(manager.activeWalletId!));
      } catch (error) {
        // Wallet not found or error fetching
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, manager.activeWalletId, wallets]);

  if (isLoading) return null;
  return manager.activeWalletId && wallets[manager.activeWalletId] ? wallets[manager.activeWalletId] : null;
};

export default useActiveWallet;
