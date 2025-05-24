import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiRefresh} from '@mdi/js';
import MdiIcon from '@mdi/react';
import orderBy from 'lodash/orderBy';

import Button, {ButtonColor} from 'components/Button';
import ExpandableWire from 'components/ExpandableWire';
import Loader from 'components/Loader';
import Line from 'components/Line';
import {AppDispatch, SFC} from 'types';
import {WireType} from 'enums';
import {colors} from 'styles';
import {createWalletDeposit, getWalletDepositBalance} from 'dispatchers/wallets';
import {displayErrorToast} from 'utils/toasts';
import {getWires} from 'selectors/state';
import {useActiveWallet} from 'hooks';

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
          <S.QR text={activeWallet.deposit_account_number} width={120} />
          <S.LeftCornerBorders />
          <S.RightCornerBorders />
        </S.QrWrapper>
        <S.CopyContainer text={activeWallet.deposit_account_number} />
      </S.Top>
      <Line />
      <S.DepositAccountRow>
        <S.DepositLeft>
          <S.Text>Deposit Account Balance:</S.Text>
          <S.Balance>{activeWallet.deposit_balance.toLocaleString()}</S.Balance>
        </S.DepositLeft>
        {renderIcon()}
        {renderButton()}
      </S.DepositAccountRow>
      <Line />
      <S.Div>
        <S.Title>Deposit History</S.Title>
        {renderDeposits()}
      </S.Div>
    </S.Container>
  );
};

export default WalletDeposit;
