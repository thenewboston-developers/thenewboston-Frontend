import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ArtworkCard from 'components/ArtworkCard';
import ArtworkCardSkeleton from 'components/ArtworkCard/ArtworkCardSkeleton';
import EmptyText from 'components/EmptyText';
import InfiniteScroll from 'components/InfiniteScroll';
import ArtIcon from 'assets/art_icon.svg';
import {AppDispatch, SFC} from 'types';
import {getArtworks as _getArtworks, resetArtworks as _resetArtworks} from 'dispatchers/artworks';
import {getArtworks as getArtworksState} from 'selectors/state';

import * as S from './Styles';

const Marketplace: SFC = ({className}) => {
  const artworksState = useSelector(getArtworksState);
  const {artworks, hasMore, isLoading} = artworksState;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      dispatch(_resetArtworks());
      await dispatch(_getArtworks({price_amount_isnull: false, price_core_isnull: false}));
    })();
  }, [dispatch]);

  const artworkList = useMemo(() => {
    return artworks
      ? Object.values(artworks).filter(({price_amount, price_core}) => !!price_amount && !!price_core)
      : [];
  }, [artworks]);

  const fetchMoreArtworks = async () => {
    if (!isLoading) {
      await dispatch(_getArtworks());
    }
  };

  const getHeading = () => <S.ArtworkCardsHeading>Buy from our marketplace</S.ArtworkCardsHeading>;

  const getSkeleton = (n: number) => (
    <>
      {getHeading()}
      <S.ArtworkCards>
        <ArtworkCardSkeleton dataLength={n} />
      </S.ArtworkCards>
    </>
  );

  const renderArtworkCards = () => {
    if (artworkList.length) {
      return (
        <S.ArtworkCards>
          {artworkList.map((artwork) => (
            <ArtworkCard artwork={artwork} key={artwork.id} />
          ))}
        </S.ArtworkCards>
      );
    }
  };

  const renderContent = () => {
    if (isLoading && !artworkList.length) {
      return getSkeleton(4);
    }
    if (!!artworkList.length) {
      return (
        <>
          {getHeading()}
          {renderArtworkCards()}
        </>
      );
    }

    return <EmptyText>No artwork to display.</EmptyText>;
  };

  return (
    <S.Container className={className}>
      <InfiniteScroll
        dataLength={artworkList.length}
        hasMore={hasMore}
        next={fetchMoreArtworks}
        heightMargin={50}
        loader={getSkeleton(4)}
      >
        <S.Banner
          heading={'Craft Your Vision, Reap Rewards'}
          icon={ArtIcon}
          subHeading={'Explore the dynamic world of creating and selling your own art'}
        />

        {renderContent()}
      </InfiniteScroll>
    </S.Container>
  );
};

export default Marketplace;
