import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiRefresh} from '@mdi/js';
import MdiIcon from '@mdi/react';
import orderBy from 'lodash/orderBy';

import Button, {ButtonColor} from 'components/Button';
import EmptyText from 'components/EmptyText';
import ExpandableWire from 'components/ExpandableWire';
import Line from 'components/Line';
import Loader from 'components/Loader';
import {createWalletDeposit, getWalletDepositBalance} from 'dispatchers/wallets';
import {getWires as getWiresAction} from 'dispatchers/wires';
import {WireType} from 'enums';
import {getManager, getWires} from 'selectors/state';
import {colors} from 'styles';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const WalletDeposit: SFC = ({className}) => {
  const [createDepositRequestPending, setCreateDepositRequestPending] = useState(false);
  const [getBalanceRequestPending, setGetBalanceRequestPending] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const wires = useSelector(getWires);
  const {activeWallet} = manager;

  useEffect(() => {
    dispatch(getWiresAction());
  }, [dispatch]);

  if (!activeWallet) return null;

  const isInternalCurrency = activeWallet.currency.domain === null;

  if (isInternalCurrency) {
    return (
      <S.InternalCurrencyMessage className={className}>
        <S.Title>Deposits Not Available</S.Title>
        <S.Text>
          This is an internal currency that exists only within our platform. Deposits from external sources are not
          supported.
        </S.Text>
      </S.InternalCurrencyMessage>
    );
  }

  const handleRefreshIconClick = async () => {
    setGetBalanceRequestPending(true);

    try {
      await dispatch(getWalletDepositBalance(activeWallet.id));
    } catch (error) {
      displayErrorToast('Error fetching deposit balance');
    } finally {
      setGetBalanceRequestPending(false);
    }
  };

  const handleTransferButtonClick = async () => {
    setCreateDepositRequestPending(true);

    try {
      await dispatch(createWalletDeposit(activeWallet.id));
    } catch (error) {
      displayErrorToast('Error depositing funds');
    } finally {
      setCreateDepositRequestPending(false);
    }
  };

  const renderButton = () => {
    if (!activeWallet.deposit_balance || activeWallet.deposit_balance <= 1) return null;

    return (
      <Button
        color={ButtonColor.success}
        disabled={createDepositRequestPending}
        isSubmitting={createDepositRequestPending}
        onClick={handleTransferButtonClick}
        text="Transfer to Main Account"
      />
    );
  };

  const renderDeposits = () => {
    const deposits = orderBy(Object.values(wires), ['created_date'], ['desc']).filter(
      (wire) => wire.currency === activeWallet.currency.id && wire.wire_type === WireType.DEPOSIT,
    );

    if (deposits.length === 0) {
      return <EmptyText>No deposits yet</EmptyText>;
    }

    return deposits.map((wire) => <ExpandableWire key={wire.id} wire={wire} />);
  };

  const renderIcon = () => {
    let content = (
      <S.RefreshIconContainer onClick={handleRefreshIconClick}>
        <MdiIcon path={mdiRefresh} size={`${20}px`} color={colors.palette.blue[700]} />
      </S.RefreshIconContainer>
    );

    if (getBalanceRequestPending) content = <Loader size={20} />;

    return <S.IconWrapper>{content}</S.IconWrapper>;
  };

  return (
    <S.Container className={className}>
      <S.Top>
        <S.QrWrapper>
          <S.QR text={activeWallet.deposit_account_number || ''} width={120} />
          <S.LeftCornerBorders />
          <S.RightCornerBorders />
        </S.QrWrapper>
        <S.CopyContainer text={activeWallet.deposit_account_number || ''} />
      </S.Top>
      <Line />
      <S.DepositAccountRow>
        <S.DepositLeft>
          <S.Text>Deposit Account Balance:</S.Text>
          <S.Balance>{(activeWallet.deposit_balance || 0).toLocaleString()}</S.Balance>
        </S.DepositLeft>
        {renderIcon()}
        {renderButton()}
      </S.DepositAccountRow>
      <Line />
      <S.DepositSection>
        <S.Title>Deposit History</S.Title>
        {renderDeposits()}
      </S.DepositSection>
    </S.Container>
  );
};

export default WalletDeposit;
