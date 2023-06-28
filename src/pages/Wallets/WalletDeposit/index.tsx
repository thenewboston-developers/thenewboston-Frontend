import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {mdiRefresh} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Button, {ButtonColor} from 'components/Button';
import Loader from 'components/Loader';
import Qr from 'components/Qr';
import {getWalletBalance} from 'dispatchers/wallets';
import {useActiveWallet} from 'hooks';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const WalletDeposit: SFC = ({className}) => {
  const [requestPending, setRequestPending] = useState(false);
  const activeWallet = useActiveWallet();
  const dispatch = useDispatch<AppDispatch>();

  if (!activeWallet) return null;

  const handleIconClick = async () => {
    setRequestPending(true);

    try {
      await dispatch(getWalletBalance(activeWallet.id));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error fetching balance');
    } finally {
      setRequestPending(false);
    }
  };

  const renderIcon = () => {
    let content = (
      <S.RefreshIconContainer onClick={handleIconClick}>
        <MdiIcon path={mdiRefresh} size={`${16}px`} />
      </S.RefreshIconContainer>
    );

    if (requestPending) content = <Loader size={16} />;

    return <S.IconWrapper>{content}</S.IconWrapper>;
  };

  return (
    <S.Container className={className}>
      <S.Panel>
        <S.Top>
          <h2>Deposit Account</h2>
          <S.QrWrapper>
            <Qr text={activeWallet.deposit_account_number} width={120} />
          </S.QrWrapper>
          <S.CopyContainer text={activeWallet.deposit_account_number} />
        </S.Top>
      </S.Panel>
      <S.Panel>
        <S.DepositAccountRow>
          <S.DepositLeft>
            <h4>Deposit Account Balance: {activeWallet.deposit_balance}</h4>
            {renderIcon()}
          </S.DepositLeft>
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
