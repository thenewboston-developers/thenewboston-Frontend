import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {mdiRefresh} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Button, {ButtonColor} from 'components/Button';
import ExpandableWire from 'components/ExpandableWire';
import Loader from 'components/Loader';
import Qr from 'components/Qr';
import {createWalletDeposit, getWalletDepositBalance} from 'dispatchers/wallets';
import {WireType} from 'enums';
import {useActiveWallet} from 'hooks';
import {getWires} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const WalletDeposit: SFC = ({className}) => {
  const [createDepositRequestPending, setCreateDepositRequestPending] = useState(false);
  const [getBalanceRequestPending, setGetBalanceRequestPending] = useState(false);
  const activeWallet = useActiveWallet();
  const dispatch = useDispatch<AppDispatch>();
  const wires = useSelector(getWires);

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

  const renderButton = () => {
    if (activeWallet.deposit_balance <= 1) return null;

    return (
      <Button
        color={ButtonColor.success}
        disabled={createDepositRequestPending}
        isSubmitting={createDepositRequestPending}
        onClick={handleButtonClick}
        text="Transfer to Main Account"
      />
    );
  };

  const renderDeposits = () => {
    return orderBy(Object.values(wires), ['created_date'], ['desc'])
      .filter((wire) => wire.core === activeWallet.core.id && wire.wire_type === WireType.DEPOSIT)
      .map((wire) => <ExpandableWire key={wire.id} wire={wire} />);
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
            <h4>Deposit Account Balance: {activeWallet.deposit_balance.toLocaleString()}</h4>
            {renderIcon()}
          </S.DepositLeft>
          {renderButton()}
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
