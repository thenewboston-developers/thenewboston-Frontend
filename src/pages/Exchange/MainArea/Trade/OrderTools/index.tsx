import {useState} from 'react';
import {mdiCartArrowDown, mdiCartArrowUp} from '@mdi/js';
import Icon from '@mdi/react';

import AuthButtons from 'components/AuthButtons';
import {useIsAuthenticated} from 'hooks';
import {AssetPair, SFC} from 'types';

import AssetPairSelector from './AssetPairSelector';
import Buy from './Buy';
import Sell from './Sell';
import * as S from './Styles';

enum TradeTab {
  BUY = 'BUY',
  SELL = 'SELL',
}

interface OrderToolsProps {
  activeAssetPair: AssetPair | null;
}

const OrderTools: SFC<OrderToolsProps> = ({activeAssetPair, className}) => {
  const [activeTab, setActiveTab] = useState(TradeTab.BUY);
  const isAuthenticated = useIsAuthenticated();

  const renderTabContent = () => {
    if (!activeAssetPair) return null;

    // The order forms work with a member's wallets, signed-out visitors can still follow the chart and the order book
    if (!isAuthenticated) {
      const {ticker} = activeAssetPair.primary_currency;

      return (
        <S.TabContent>
          <S.GuestText>
            Sign in or create an account to {activeTab === TradeTab.BUY ? 'buy' : 'sell'} {ticker}.
          </S.GuestText>
          <AuthButtons />
        </S.TabContent>
      );
    }

    const tabContent = {
      [TradeTab.BUY]: <Buy activeAssetPair={activeAssetPair} />,
      [TradeTab.SELL]: <Sell activeAssetPair={activeAssetPair} />,
    };

    return <S.TabContent>{tabContent[activeTab]}</S.TabContent>;
  };

  const renderTabs = () => {
    if (!activeAssetPair) return null;

    return (
      <S.Tabs>
        <S.BuyTab isActive={activeTab === TradeTab.BUY} onClick={() => setActiveTab(TradeTab.BUY)}>
          <Icon path={mdiCartArrowDown} size={'16px'} />
          Buy
        </S.BuyTab>
        <S.SellTab isActive={activeTab === TradeTab.SELL} onClick={() => setActiveTab(TradeTab.SELL)}>
          <Icon path={mdiCartArrowUp} size={'16px'} />
          Sell
        </S.SellTab>
      </S.Tabs>
    );
  };

  return (
    <S.Container className={className}>
      <AssetPairSelector activeAssetPair={activeAssetPair} />
      <S.Panel>
        {renderTabs()}
        {renderTabContent()}
      </S.Panel>
    </S.Container>
  );
};

export default OrderTools;
