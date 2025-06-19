import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import OrderBookWebSocket from 'containers/OrderBookWebSocket';
import TradeWebSocket from 'containers/TradeWebSocket';
import {getAssetPairs as _getAssetPairs} from 'dispatchers/assetPairs';
import {useActiveAssetPair} from 'hooks';
import {getAssetPairs} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import Chart from './Chart';
import OrderBook from './OrderBook';
import OrderTools from './OrderTools';
import * as S from './Styles';

const Trade: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const assetPairs = useSelector(getAssetPairs);
  const dispatch = useDispatch<AppDispatch>();

  const assetPairList = useMemo(() => Object.values(assetPairs), [assetPairs]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(_getAssetPairs());
      } catch (error) {
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
          <S.Grid>
            <OrderTools />
            <Chart />
          </S.Grid>
          <OrderBook />
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

  return (
    <S.Container className={className}>
      {renderPageContent()}
      <OrderBookWebSocket assetPair={activeAssetPair} />
      <TradeWebSocket assetPair={activeAssetPair} />
    </S.Container>
  );
};

export default Trade;
