import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import ArtworkCard from 'components/ArtworkCard';
import EmptyText from 'components/EmptyText';
import {getArtworks as _getArtworks} from 'dispatchers/artworks';
import {getArtworks} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const Marketplace: SFC = ({className}) => {
  const artworks = useSelector(getArtworks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      await dispatch(_getArtworks());
    })();
  }, [dispatch]);

  const artworkList = useMemo(() => {
    return orderBy(Object.values(artworks), ['created_date'], ['desc']);
  }, [artworks]);

  const renderArtworkCards = () => {
    const _artworks = artworkList.map((artwork) => <ArtworkCard artwork={artwork} key={artwork.id} />);
    return <S.ArtworkCards>{_artworks}</S.ArtworkCards>;
  };

  const renderContent = () => {
    if (!!artworkList.length) return renderArtworkCards();
    return <EmptyText>No artwork to display.</EmptyText>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Marketplace;
