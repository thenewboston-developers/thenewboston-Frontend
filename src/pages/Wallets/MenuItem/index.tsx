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
    dispatch(updateManager({activeWalletId: wallet.id}));
  };

  return (
    <>
      <S.Container $isActive={manager.activeWalletId === wallet.id} className={className} onClick={handleClick}>
        <S.Text>
          <S.Div>
            <S.Ticker $isActive={manager.activeWalletId === wallet.id}>{wallet.core.ticker}</S.Ticker>
            <S.Domain>{wallet.core.domain}</S.Domain>
          </S.Div>
          <CoreLogo logo={wallet.core.logo} />
        </S.Text>
        <S.Balance>
          Balance: <S.Span> {wallet.balance.toLocaleString()}</S.Span>
        </S.Balance>
      </S.Container>
    </>
  );
};

export default MenuItem;
