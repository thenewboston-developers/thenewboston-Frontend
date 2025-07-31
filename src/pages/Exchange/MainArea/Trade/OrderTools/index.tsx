import {useState} from 'react';
import {mdiCartArrowDown, mdiCartArrowUp} from '@mdi/js';
import Icon from '@mdi/react';

import Tab from 'components/Tab';
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

  const renderTabContent = () => {
    if (!activeAssetPair) return null;

    const tabContent = {
      [TradeTab.BUY]: <Buy activeAssetPair={activeAssetPair} />,
      [TradeTab.SELL]: <Sell activeAssetPair={activeAssetPair} />,
    };

    return <S.TabContent>{tabContent[activeTab]}</S.TabContent>;
  };

  const renderTabs = () => {
    if (!activeAssetPair) return null;

    return (
      <S.TabsWrapper>
        <S.Tabs>
          <Tab isActive={activeTab === TradeTab.BUY} onClick={() => setActiveTab(TradeTab.BUY)}>
            <Icon path={mdiCartArrowDown} size={'16px'} />
            Buy
          </Tab>
          <Tab isActive={activeTab === TradeTab.SELL} onClick={() => setActiveTab(TradeTab.SELL)}>
            <Icon path={mdiCartArrowUp} size={'16px'} />
            Sell
          </Tab>
        </S.Tabs>
      </S.TabsWrapper>
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
