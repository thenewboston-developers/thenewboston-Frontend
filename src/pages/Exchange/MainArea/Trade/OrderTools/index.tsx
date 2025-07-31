import {useState} from 'react';
import {mdiCartArrowDown, mdiCartArrowUp} from '@mdi/js';
import Icon from '@mdi/react';

import Tab from 'components/Tab';
import {useActiveAssetPair} from 'hooks';
import {SFC} from 'types';

import AssetPairSelector from './AssetPairSelector';
import Buy from './Buy';
import Sell from './Sell';
import * as S from './Styles';

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
      <AssetPairSelector />
      <S.Panel>
        {renderTabs()}
        {renderTabContent()}
      </S.Panel>
    </S.Container>
  );
};

export default OrderTools;
