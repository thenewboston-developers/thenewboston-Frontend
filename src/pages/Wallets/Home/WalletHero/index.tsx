import {Link} from 'react-router-dom';
import {mdiArrowTopRight, mdiChevronDown, mdiInformationOutline, mdiSwapHorizontal} from '@mdi/js';
import MdiIcon from '@mdi/react';

import BannerArt from 'components/BannerArt';
import {DEFAULT_CURRENCY_TICKER} from 'constants/general';
import {BannerArtVariant} from 'enums';
import {SFC, Wallet} from 'types';

import {getWalletValue, Markets} from '../utils';

import * as S from './Styles';

export interface WalletHeroProps {
  markets: Markets;
  onSendClick(): void;
  onSwitchClick(): void;
  wallet: Wallet;
  walletCount: number;
}

const WalletHero: SFC<WalletHeroProps> = ({className, markets, onSendClick, onSwitchClick, wallet, walletCount}) => {
  const {balance, currency} = wallet;
  const isDefaultCurrency = currency.ticker === DEFAULT_CURRENCY_TICKER;
  const price = markets.prices[currency.id];
  const tradePath = isDefaultCurrency ? '/exchange/home' : `/exchange/trade/${markets.pairIds[currency.id]}`;
  const value = getWalletValue(wallet, markets.prices);

  const getEstimate = (): string => {
    if (isDefaultCurrency) return 'The currency every market on the exchange is priced in';
    if (value === null) return 'Not traded on the exchange yet, so there is no estimate of its value';

    return (
      `≈ ${value.toLocaleString()} ${DEFAULT_CURRENCY_TICKER} at the last trade price of ` +
      `${price.toLocaleString()} ${DEFAULT_CURRENCY_TICKER}`
    );
  };

  return (
    <S.Container aria-label={`${currency.ticker} wallet`} className={className}>
      <BannerArt variant={BannerArtVariant.coins} />
      <S.Top>
        <S.Identity>
          <S.Logo alt="" src={currency.logo} />
          <S.IdentityText>
            <S.Ticker>{currency.ticker}</S.Ticker>
            <S.Kind>{currency.domain || 'Internal currency'}</S.Kind>
          </S.IdentityText>
        </S.Identity>
        <S.SwitchButton onClick={onSwitchClick} type="button">
          {walletCount > 1 ? `${walletCount} wallets` : 'Wallets'}
          <MdiIcon aria-hidden="true" path={mdiChevronDown} size="18px" />
        </S.SwitchButton>
      </S.Top>
      <S.BalanceLabel>Balance</S.BalanceLabel>
      <S.Balance>
        {balance.toLocaleString()}
        <S.BalanceTicker>{currency.ticker}</S.BalanceTicker>
      </S.Balance>
      <S.Estimate>{getEstimate()}</S.Estimate>
      <S.Actions>
        <S.PrimaryAction disabled={balance === 0} onClick={onSendClick} type="button">
          <MdiIcon aria-hidden="true" path={mdiArrowTopRight} size="18px" />
          Send
        </S.PrimaryAction>
        {isDefaultCurrency || markets.pairIds[currency.id] ? (
          <S.SecondaryAction as={Link} to={tradePath}>
            <MdiIcon aria-hidden="true" path={mdiSwapHorizontal} size="18px" />
            {isDefaultCurrency ? 'Markets' : 'Trade'}
          </S.SecondaryAction>
        ) : null}
        <S.SecondaryAction as={Link} to={`/currencies/${currency.id}`}>
          <MdiIcon aria-hidden="true" path={mdiInformationOutline} size="18px" />
          About {currency.ticker}
        </S.SecondaryAction>
      </S.Actions>
    </S.Container>
  );
};

export default WalletHero;
