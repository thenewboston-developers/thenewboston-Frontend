import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import ArtworkCard from 'components/ArtworkCard';
import EmptyText from 'components/EmptyText';
import InfiniteScroll from 'components/InfiniteScroll';
import {AppDispatch, SFC} from 'types';
import {getArtworks as _getArtworks, resetArtworks as _resetArtworks} from 'dispatchers/artworks';
import {getArtworks as getArtworksState} from 'selectors/state';
import * as S from './Styles';

const Artworks: SFC = ({className}) => {
  const {id} = useParams();
  const artworksState = useSelector(getArtworksState);
  const {artworks, hasMore, isLoading} = artworksState;
  const dispatch = useDispatch<AppDispatch>();

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (!userId) return;

    (async () => {
      dispatch(_resetArtworks());
      await dispatch(_getArtworks({owner: userId}));
    })();
  }, [dispatch, userId]);

  const artworkList = useMemo(() => {
    return Object.values(artworks).filter(({owner}) => owner.id === userId);
  }, [artworks, userId]);

  const fetchMoreArtworks = async () => {
    if (!isLoading) {
      await dispatch(_getArtworks());
    }
  };

  const renderArtworkCards = () => {
    if (artworkList.length) {
      return (
        <InfiniteScroll dataLength={artworkList.length} hasMore={hasMore} next={fetchMoreArtworks} heightMargin={0}>
          <S.ArtworkCards>
            {artworkList.map((artwork) => (
              <ArtworkCard showBadge={true} artwork={artwork} key={artwork.id} />
            ))}
          </S.ArtworkCards>
        </InfiniteScroll>
      );
    }
  };

  const renderContent = () => {
    if (!!artworkList.length) return renderArtworkCards();
    return <EmptyText>No artwork to display.</EmptyText>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Artworks;
