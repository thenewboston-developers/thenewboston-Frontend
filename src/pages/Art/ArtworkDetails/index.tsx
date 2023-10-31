import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getArtwork} from 'dispatchers/artworks';
import {getArtworks} from 'selectors/state';
import {AppDispatch, Artwork, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const ArtworkDetails: SFC = ({className}) => {
  const {id} = useParams();
  const artworks = useSelector(getArtworks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        await dispatch(getArtwork(parseInt(id, 10)));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching artwork details');
      }
    })();
  }, [dispatch, id]);

  const artwork = useMemo((): Artwork | undefined => {
    if (!id) return undefined;
    return artworks[id];
  }, [id, artworks]);

  const renderLeft = () => {
    if (!artwork) return null;

    return (
      <S.Left>
        <S.Img alt="Artwork image" src={artwork.image} />
      </S.Left>
    );
  };

  const renderRight = () => {
    if (!artwork) return null;

    return (
      <S.Right>
        <S.Name>{artwork.name}</S.Name>
        <S.Description>{artwork.description}</S.Description>
        <S.UserLabel
          avatar={artwork.owner.avatar}
          description="Owner"
          id={artwork.owner.id}
          username={artwork.owner.username}
        />
      </S.Right>
    );
  };

  if (!artwork) return null;

  return (
    <S.Container className={className}>
      {renderLeft()}
      {renderRight()}
    </S.Container>
  );
};

export default ArtworkDetails;
