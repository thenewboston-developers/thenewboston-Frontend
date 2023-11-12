import {useState} from 'react';

import Tab from 'components/Tab';
import {useActiveAssetPair} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';
import Buy from './Buy';
import Sell from './Sell';

enum TradeTab {
  BUY = 'BUY',
  SELL = 'SELL',
}

const OrderTools: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState(TradeTab.BUY);
  const activeAssetPair = useActiveAssetPair();

  const renderTabContent = () => {
    if (!activeAssetPair) return null;

    const tabContent = {
      [TradeTab.BUY]: <Buy />,
      [TradeTab.SELL]: <Sell />,
    };

    return <S.TabContent>{tabContent[activeTab]}</S.TabContent>;
  };

  const renderTabs = () => {
    if (!activeAssetPair) return null;

    return (
      <S.Tabs>
        <Tab isActive={activeTab === TradeTab.BUY} onClick={() => setActiveTab(TradeTab.BUY)}>
          Buy
        </Tab>
        <Tab isActive={activeTab === TradeTab.SELL} onClick={() => setActiveTab(TradeTab.SELL)}>
          Sell
        </Tab>
      </S.Tabs>
    );
  };

  return (
    <S.Container className={className}>
      {renderTabs()}
      {renderTabContent()}
    </S.Container>
  );
};

export default OrderTools;
