import {useDispatch, useSelector} from 'react-redux';

import CoreLogo from 'components/CoreLogo';
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
    dispatch(updateManager({activeWallet: wallet.id}));
  };

  return (
    <S.Container $isActive={manager.activeWallet === wallet.id} className={className} onClick={handleClick}>
      <CoreLogo logo={wallet.core.logo} />
      <S.Text>
        <S.Ticker>{wallet.core.ticker}</S.Ticker>
        <S.Domain>{wallet.core.domain}</S.Domain>
        <S.Balance>Balance: {wallet.balance.toLocaleString()}</S.Balance>
      </S.Text>
    </S.Container>
  );
};

export default MenuItem;
