import {useSelector} from 'react-redux';

import {getManager, getWallets} from 'selectors/state';
import {Wallet} from 'types';

const useActiveWallet = (): Wallet | null => {
  const manager = useSelector(getManager);
  const wallets = useSelector(getWallets);

  return manager.activeWallet && wallets[manager.activeWallet] ? wallets[manager.activeWallet] : null;
};

export default useActiveWallet;
