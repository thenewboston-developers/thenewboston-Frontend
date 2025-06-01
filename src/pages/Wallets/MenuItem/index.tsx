import {useDispatch, useSelector} from 'react-redux';

import CurrencyLogo from 'components/CurrencyLogo';
import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC, Wallet} from 'types';

import * as S from './Styles';

export interface MenuItemProps {
  wallet: Wallet;
}

const MenuItem: SFC<MenuItemProps> = ({className, wallet}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const handleClick = () => {
    dispatch(updateManager({activeWalletId: wallet.id}));
  };

  return (
    <>
      <S.Container $isActive={manager.activeWalletId === wallet.id} className={className} onClick={handleClick}>
        <S.CurrencyInfo>
          <CurrencyLogo logo={wallet.currency.logo} />
          <S.CurrencyDetails>
            <S.Ticker $isActive={manager.activeWalletId === wallet.id}>{wallet.currency.ticker}</S.Ticker>
            <S.Domain>{wallet.currency.domain}</S.Domain>
          </S.CurrencyDetails>
        </S.CurrencyInfo>
        <S.Balance>
          Balance: <S.BalanceAmount>{wallet.balance.toLocaleString()}</S.BalanceAmount>
        </S.Balance>
      </S.Container>
    </>
  );
};

export default MenuItem;
