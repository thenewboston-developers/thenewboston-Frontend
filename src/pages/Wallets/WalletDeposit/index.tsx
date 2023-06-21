import {useSelector} from 'react-redux';

import Button, {ButtonColor} from 'components/Button';
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
      <S.Panel>
        <S.Top>
          <h2>Deposit Account</h2>
          <S.QrWrapper>
            <Qr text={self.deposit_account_number} width={120} />
          </S.QrWrapper>
          <S.CopyContainer text={self.deposit_account_number} />
        </S.Top>
      </S.Panel>
      <S.Panel>
        <S.DepositAccountRow>
          <h4>Deposit Account Balance: 1,980</h4>
          <Button color={ButtonColor.success} text="Transfer to Main Account" />
        </S.DepositAccountRow>
      </S.Panel>
      <S.Panel>
        <h4>Deposits</h4>
      </S.Panel>
    </S.Container>
  );
};

export default WalletDeposit;
