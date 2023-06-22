import {useState} from 'react';

import {SFC} from 'types';
import AssetPairSelector from './AssetPairSelector';
import Buy from './Buy';
import * as S from './Styles';

enum Tab {
  buy = 'buy',
  sell = 'sell',
}

const Exchange: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState(Tab.buy);

  const renderTabContent = () => {
    const tabContent = {
      [Tab.buy]: <Buy />,
      [Tab.sell]: <h4>Sell</h4>,
    };

    return <S.TabContent>{tabContent[activeTab]}</S.TabContent>;
  };

  return (
    <S.Container className={className}>
      <AssetPairSelector />
      <S.Tabs>
        <S.Tab $isActive={activeTab === Tab.buy} onClick={() => setActiveTab(Tab.buy)}>
          Buy
        </S.Tab>
        <S.Tab $isActive={activeTab === Tab.sell} onClick={() => setActiveTab(Tab.sell)}>
          Sell
        </S.Tab>
      </S.Tabs>
      {renderTabContent()}
    </S.Container>
  );
};

export default Exchange;
