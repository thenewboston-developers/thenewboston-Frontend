import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import UserLabel from 'components/UserLabel';
import {getArtworkTransfers as _getArtworkTransfers} from 'dispatchers/artworkTransfers';
import {getArtworkTransfers} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {longDate} from 'utils/dates';
import * as S from './Styles';

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
    return artworkTransferList.map(({created_date, new_owner, previous_owner}) => (
      <S.ArtTransfers>
        <UserLabel
          avatar={previous_owner.avatar}
          description="Previous Owner"
          id={previous_owner.id}
          username={previous_owner.username}
        />
        <UserLabel avatar={new_owner.avatar} description="New Owner" id={new_owner.id} username={new_owner.username} />
        <div>{longDate(created_date)}</div>
      </S.ArtTransfers>
    ));
  };

  return (
    <S.Container className={className}>
      <h1>Transfer History</h1>
      {renderArtTransfers()}
    </S.Container>
  );
};

export default ArtworkTransferHistory;
