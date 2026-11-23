import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import PageHeader from 'components/PageHeader';
import OrderBookWebSocket from 'containers/OrderBookWebSocket';
import TradeWebSocket from 'containers/TradeWebSocket';
import {getAssetPair as _getAssetPair, getAssetPairs as _getAssetPairs} from 'dispatchers/assetPairs';
import {BannerArtVariant} from 'enums';
import {getAssetPairs} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import Chart from './Chart';
import OrderBook from './OrderBook';
import OrderTools from './OrderTools';
import * as S from './Styles';

const Trade: SFC = ({className}) => {
  const {assetPairId} = useParams<{assetPairId: string}>();
  const assetPairs = useSelector(getAssetPairs);
  const activeAssetPair = useMemo(() => {
    if (!assetPairId || !assetPairs[assetPairId]) return null;
    return assetPairs[assetPairId];
  }, [assetPairId, assetPairs]);
  const assetPairList = useMemo(() => Object.values(assetPairs), [assetPairs]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      if (!assetPairId) return;

      try {
        await dispatch(_getAssetPair(assetPairId));
      } catch (error) {
        displayErrorToast('Error fetching asset pair');
      }
    })();
  }, [assetPairId, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(_getAssetPairs());
      } catch (error) {
        displayErrorToast('Error fetching asset pairs');
      }
    })();
  }, [dispatch]);

  const renderPageContent = () => {
    if (!!assetPairList.length) {
      return (
        <>
          <S.Grid>
            <OrderTools activeAssetPair={activeAssetPair} />
            <Chart activeAssetPair={activeAssetPair} />
          </S.Grid>
          <OrderBook activeAssetPair={activeAssetPair} />
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
      <PageHeader
        art={BannerArtVariant.depth}
        description="Follow the market, explore the order book, and trade at your price."
        eyebrow="Your trading workspace"
        title={
          activeAssetPair
            ? `${activeAssetPair.primary_currency.ticker} / ${activeAssetPair.secondary_currency.ticker}`
            : 'Trade currencies'
        }
      >
        <Link to="/exchange/home">Explore markets</Link>
      </PageHeader>
      {renderPageContent()}
      <OrderBookWebSocket assetPair={activeAssetPair} />
      <TradeWebSocket assetPair={activeAssetPair} />
    </S.Container>
  );
};

export default Trade;
