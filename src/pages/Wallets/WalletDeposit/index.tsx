import {useActiveWallet} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

const WalletDeposit: SFC = ({className}) => {
  const activeWallet = useActiveWallet();

  if (!activeWallet) return null;

  return <S.Container className={className}>{activeWallet.balance}</S.Container>;
};

export default WalletDeposit;
