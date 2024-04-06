import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import {getAssetPairs as _getAssetPairs} from 'dispatchers/assetPairs';
import {useActiveAssetPair} from 'hooks';
import {getAssetPairs} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import AssetPairSelector from './AssetPairSelector';
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

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default Trade;
