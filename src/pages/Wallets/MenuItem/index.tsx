import CoreLogo from 'components/CoreLogo';
import {SFC, Wallet} from 'types';
import * as S from './Styles';

export interface MenuItemProps {
  wallet: Wallet;
}

const MenuItem: SFC<MenuItemProps> = ({className, wallet}) => {
  return (
    <S.Container className={className}>
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
