import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Tab from 'components/Tab';
import {getAssetPairs as _getAssetPairs} from 'dispatchers/assetPairs';
import {useActiveAssetPair} from 'hooks';
import {getAssetPairs} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import AssetPairSelector from './AssetPairSelector';
import Buy from './Buy';
import OrderBook from './OrderBook';
import Sell from './Sell';
import * as S from './Styles';

enum TradeTab {
  BUY = 'BUY',
  SELL = 'SELL',
}

const Trade: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState(TradeTab.BUY);
  const activeAssetPair = useActiveAssetPair();
  const assetPairs = useSelector(getAssetPairs);
  const dispatch = useDispatch<AppDispatch>();

  const assetPairList = useMemo(() => Object.values(assetPairs), [assetPairs]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(_getAssetPairs());
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching asset pairs');
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!assetPairList.length || !!activeAssetPair) return;
      const firstAssetPair = assetPairList[0];
      dispatch(updateManager({activeAssetPairId: firstAssetPair.id}));
    })();
  }, [activeAssetPair, assetPairList, dispatch]);

  const renderPageContent = () => {
    if (!!assetPairList.length) {
      return (
        <>
          <AssetPairSelector />
          {renderTabs()}
          <S.Grid>
            {renderTabContent()}
            <OrderBook />
          </S.Grid>
        </>
      );
    }

    return (
      <EmptyPage
        bottomText="Create an asset pair to enable trading"
        graphic={LeavesEmptyState}
        topText="Nothing here!"
      />
    );
  };

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

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default Trade;
