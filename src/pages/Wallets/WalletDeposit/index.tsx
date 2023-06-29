import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {mdiRefresh} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Button, {ButtonColor} from 'components/Button';
import ExpandableTransfer from 'components/ExpandableTransfer';
import Loader from 'components/Loader';
import Qr from 'components/Qr';
import {createWalletDeposit, getWalletDepositBalance} from 'dispatchers/wallets';
import {useActiveWallet} from 'hooks';
import {getTransfers} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const WalletDeposit: SFC = ({className}) => {
  const [createDepositRequestPending, setCreateDepositRequestPending] = useState(false);
  const [getBalanceRequestPending, setGetBalanceRequestPending] = useState(false);
  const activeWallet = useActiveWallet();
  const dispatch = useDispatch<AppDispatch>();
  const transfers = useSelector(getTransfers);

  if (!activeWallet) return null;

  const handleButtonClick = async () => {
    setCreateDepositRequestPending(true);

    try {
      await dispatch(createWalletDeposit(activeWallet.id));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error depositing funds');
    } finally {
      setCreateDepositRequestPending(false);
    }
  };

  const handleIconClick = async () => {
    setGetBalanceRequestPending(true);

    try {
      await dispatch(getWalletDepositBalance(activeWallet.id));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error fetching deposit balance');
    } finally {
      setGetBalanceRequestPending(false);
    }
  };

  const renderDeposits = () => {
    const orderedTransfers = orderBy(Object.values(transfers), ['created_date'], ['desc']);
    return orderedTransfers
      .filter((transfer) => transfer.sender === activeWallet.deposit_account_number)
      .map((transfer) => <ExpandableTransfer key={transfer.id} transfer={transfer} />);
  };

  const renderIcon = () => {
    let content = (
      <S.RefreshIconContainer onClick={handleIconClick}>
        <MdiIcon path={mdiRefresh} size={`${16}px`} />
      </S.RefreshIconContainer>
    );

    if (getBalanceRequestPending) content = <Loader size={16} />;

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
          <Button
            color={ButtonColor.success}
            disabled={createDepositRequestPending}
            isSubmitting={createDepositRequestPending}
            onClick={handleButtonClick}
            text="Transfer to Main Account"
          />
        </S.DepositAccountRow>
      </S.Panel>
      <S.Panel>
        <h4>Deposits</h4>
        {renderDeposits()}
      </S.Panel>
    </S.Container>
  );
};

export default WalletDeposit;
