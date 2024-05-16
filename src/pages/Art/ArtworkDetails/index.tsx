import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import Button from 'components/Button';
import Price from 'components/Price';
import {createArtworkPurchase} from 'dispatchers/artworkPurchases';
import {getArtwork} from 'dispatchers/artworks';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import ArtworkDeleteModal from 'modals/ArtworkDeleteModal';
import ArtworkModal from 'modals/ArtworkModal';
import ArtworkTransferModal from 'modals/ArtworkTransferModal';
import {getArtworks as getArtworksState, getSelf} from 'selectors/state';
import {AppDispatch, Artwork, SFC} from 'types';
import {longDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';
import ArtworkTransferHistory from './ArtworkTransferHistory';
import * as S from './Styles';

const ArtworkDetails: SFC = ({className}) => {
  const [artworkDeleteModalIsOpen, toggleArtworkDeleteModal] = useToggle(false);
  const [artworkModalIsOpen, toggleArtworkModal] = useToggle(false);
  const [artworkTransferModalIsOpen, toggleArtworkTransferModal] = useToggle(false);
  const {id} = useParams();
  const artworksState = useSelector(getArtworksState);
  const {artworks} = artworksState;
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
    return artworks.find((obj) => obj.id === parseInt(id));
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

  const renderButtonContainer = () => {
    if (!artwork || artwork.owner.id !== self.id) return null;

    return (
      <S.ButtonContainer>
        <Button onClick={toggleArtworkModal} text="Edit" />
        <Button onClick={toggleArtworkTransferModal} text="Transfer" />
        <Button onClick={toggleArtworkDeleteModal} text="Delete" />
      </S.ButtonContainer>
    );
  };

  const renderBuyButton = () => {
    if (!artwork || artwork.owner.id === self.id) return null;
    return <Button onClick={handleBuy} text="Buy" />;
  };

  const renderImgContainer = () => {
    if (!artwork) return null;

    return (
      <S.ImgContainer>
        <S.Img alt="Artwork image" src={artwork.image} />
      </S.ImgContainer>
    );
  };

  const renderDetailsContainer = () => {
    if (!artwork) return null;

    return (
      <S.DetailsContainer>
        <S.Name>{artwork.name}</S.Name>
        <S.Description>{artwork.description}</S.Description>
        <S.UserLabel
          avatar={artwork.creator.avatar}
          description="Creator"
          id={artwork.creator.id}
          username={artwork.creator.username}
        />
        <S.UserLabel
          avatar={artwork.owner.avatar}
          description="Owner"
          id={artwork.owner.id}
          username={artwork.owner.username}
        />
        <S.CreatedDate>Created: {longDate(artwork.created_date)}</S.CreatedDate>
        {renderPriceContainer(artwork)}
        {renderButtonContainer()}
      </S.DetailsContainer>
    );
  };

  const renderPriceContainer = ({price_amount, price_core}: Artwork) => {
    if (!price_amount || !price_core) return null;

    return (
      <S.PriceContainer>
        <Price price_amount={price_amount} price_core={price_core} />
        {renderBuyButton()}
      </S.PriceContainer>
    );
  };

  if (!artwork) return null;

  return (
    <>
      <S.Container className={className}>
        <S.Top>
          {renderImgContainer()}
          {renderDetailsContainer()}
        </S.Top>
        <ArtworkTransferHistory />
      </S.Container>
      {artworkDeleteModalIsOpen ? <ArtworkDeleteModal artworkId={artwork.id} close={toggleArtworkDeleteModal} /> : null}
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
