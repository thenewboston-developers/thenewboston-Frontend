import {useSelector} from 'react-redux';
import {getManager, getWallets} from 'selectors/state';
import {Wallet} from 'types';

const useActiveWallet = (): Wallet | null => {
  const manager = useSelector(getManager);
  const wallets = useSelector(getWallets);

  return manager.activeWalletId && wallets[manager.activeWalletId] ? wallets[manager.activeWalletId] : null;
};

export default useActiveWallet;
