import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import {getArtworkTransfers as _getArtworkTransfers} from 'dispatchers/artworkTransfers';
import {getArtworkTransfers} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {longDate} from 'utils/dates';
import * as S from './Styles';
import {UserLabelV2} from 'components/UserLabelV2';

const ArtworkTransferHistory: SFC = ({className}) => {
  const {id} = useParams();
  const artworkTransfers = useSelector(getArtworkTransfers);
  const dispatch = useDispatch<AppDispatch>();

  const artworkId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    (async () => {
      if (!artworkId) return;
      await dispatch(_getArtworkTransfers({artwork: artworkId}));
    })();
  }, [artworkId, dispatch]);

  const artworkTransferList = useMemo(() => {
    if (!artworkId) return [];
    const _artworkTransfers = orderBy(Object.values(artworkTransfers), ['created_date'], ['desc']);
    return _artworkTransfers.filter(({artwork}) => artwork === artworkId);
  }, [artworkId, artworkTransfers]);

  const renderArtTransfers = () => {
    return artworkTransferList.map((artworkTransfer) => (
      <S.ArtTransfers key={artworkTransfer.id}>
        <UserLabelV2
          header="Previous Owner"
          style={{borderTop: 'none'}}
          // id={artworkTransfer.previous_owner.id}
          content={artworkTransfer.previous_owner.username}
        />
        <UserLabelV2 header="Created" content={longDate(artworkTransfer.created_date)}></UserLabelV2>
      </S.ArtTransfers>
    ));
  };

  // const renderPurchaseInformation = ({price_amount, price_core}: ArtworkTransfer) => {
  //   if (!price_amount || !price_core) return <div />;
  //   return <Price price_amount={price_amount} price_core={price_core} />;
  // };

  return (
    <S.Container className={className}>
      <S.Header>Transfer History</S.Header>
      {renderArtTransfers()}
    </S.Container>
  );
};

export default ArtworkTransferHistory;
