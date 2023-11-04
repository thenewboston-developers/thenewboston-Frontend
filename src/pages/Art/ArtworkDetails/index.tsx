import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import Button from 'components/Button';
import Price from 'components/Price';
import {createArtworkPurchase} from 'dispatchers/artworkPurchases';
import {deleteArtwork, getArtwork} from 'dispatchers/artworks';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import ArtworkModal from 'modals/ArtworkModal';
import ArtworkTransferModal from 'modals/ArtworkTransferModal';
import {getArtworks, getSelf} from 'selectors/state';
import {AppDispatch, Artwork, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import ArtworkTransferHistory from './ArtworkTransferHistory';
import * as S from './Styles';

const ArtworkDetails: SFC = ({className}) => {
  const [artworkModalIsOpen, toggleArtworkModal] = useToggle(false);
  const [artworkTransferModalIsOpen, toggleArtworkTransferModal] = useToggle(false);
  const {id} = useParams();
  const artworks = useSelector(getArtworks);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  const handleBuy = async () => {
    if (!artwork) return;

    try {
      await dispatch(
        createArtworkPurchase({
          artwork: artwork.id,
        }),
      );
      await dispatch(getArtwork(artwork.id));
      displayToast('Artwork purchased!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error purchasing artwork');
    }
  };

  const handleDelete = async () => {
    if (!artwork) return;

    try {
      await dispatch(deleteArtwork(artwork.id));
      navigate('/art/marketplace');
      displayToast('Artwork deleted!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting artwork');
    }
  };

  const renderButtonContainer = () => {
    if (!artwork || artwork.owner.id !== self.id) return null;

    return (
      <S.ButtonContainer>
        <Button onClick={toggleArtworkModal} text="Edit" />
        <Button onClick={toggleArtworkTransferModal} text="Transfer" />
        <Button onClick={handleDelete} text="Delete" />
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
        {renderPriceContainer(artwork)}
        {renderButtonContainer()}
      </S.Right>
    );
  };

  const renderPriceContainer = ({price_amount, price_core}: Artwork) => {
    if (!price_amount || !price_core) return null;

    return (
      <S.PriceContainer>
        <Price price_amount={price_amount} price_core={price_core} />
        <Button onClick={handleBuy} text="Buy" />
      </S.PriceContainer>
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
      {artworkModalIsOpen ? (
        <ArtworkModal artwork={artwork} close={toggleArtworkModal} imageUrl={artwork.image} />
      ) : null}
      {artworkTransferModalIsOpen ? (
        <ArtworkTransferModal artwork={artwork} close={toggleArtworkTransferModal} />
      ) : null}
    </>
  );
};

export default ArtworkDetails;
