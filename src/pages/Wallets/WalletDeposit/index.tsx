import {useSelector} from 'react-redux';

import Qr from 'components/Qr';
import {useActiveWallet} from 'hooks';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const WalletDeposit: SFC = ({className}) => {
  const activeWallet = useActiveWallet();
  const self = useSelector(getSelf);

  if (!activeWallet || !self.deposit_account_number) return null;

  return (
    <S.Container className={className}>
      <Qr text={self.deposit_account_number} width={120} />
      <S.CopyContainer text={self.deposit_account_number} />
      <div>{activeWallet.balance}</div>
    </S.Container>
  );
};

export default WalletDeposit;
