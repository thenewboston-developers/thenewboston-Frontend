import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import Button from 'components/Button';
import {getArtwork} from 'dispatchers/artworks';
import {useToggle} from 'hooks';
import ArtworkTransferModal from 'modals/ArtworkTransferModal';
import {getArtworks, getSelf} from 'selectors/state';
import {AppDispatch, Artwork, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import ArtworkTransferHistory from './ArtworkTransferHistory';
import * as S from './Styles';

const ArtworkDetails: SFC = ({className}) => {
  const [artworkTransferModalIsOpen, toggleArtworkTransferModal] = useToggle(false);
  const {id} = useParams();
  const artworks = useSelector(getArtworks);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

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

  const renderButtonContainer = () => {
    if (!artwork || artwork.owner.id !== self.id) return null;
    return (
      <S.ButtonContainer>
        <Button onClick={toggleArtworkTransferModal} text="Transfer Artwork" />
      </S.ButtonContainer>
    );
  };

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
        {renderButtonContainer()}
      </S.Right>
    );
  };

  if (!artwork) return null;

  return (
    <>
      <S.Container className={className}>
        <S.Top>
          {renderLeft()}
          {renderRight()}
        </S.Top>
        <ArtworkTransferHistory />
      </S.Container>
      {artworkTransferModalIsOpen ? (
        <ArtworkTransferModal artwork={artwork} close={toggleArtworkTransferModal} />
      ) : null}
    </>
  );
};

export default ArtworkDetails;
