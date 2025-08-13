import {SFC, Wallet} from 'types';

import * as S from './Styles';

interface WalletSelectorProps {
  activeWallet: Wallet | null;
  onClick: () => void;
}

const WalletSelector: SFC<WalletSelectorProps> = ({activeWallet, className, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Content>
        {activeWallet ? (
          <>
            <S.ImageContainer>
              <S.Image src={activeWallet.currency.logo} />
            </S.ImageContainer>
            <S.WalletInfo>
              <S.Ticker>{activeWallet.currency.ticker}</S.Ticker>
              <S.Balance>{activeWallet.balance.toLocaleString()}</S.Balance>
            </S.WalletInfo>
          </>
        ) : (
          <S.EmptyText>Select a wallet</S.EmptyText>
        )}
      </S.Content>
    </S.Container>
  );
};

export default WalletSelector;
