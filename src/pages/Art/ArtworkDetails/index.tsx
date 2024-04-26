import {Fragment, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import Button, {ButtonColor} from 'components/Button';
import Price from 'components/Price';
import {createArtworkPurchase} from 'dispatchers/artworkPurchases';
import {getArtwork} from 'dispatchers/artworks';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import ArtworkDeleteModal from 'modals/ArtworkDeleteModal';
import ArtworkModal from 'modals/ArtworkModal';
import ArtworkTransferModal from 'modals/ArtworkTransferModal';
import {getArtworks, getSelf} from 'selectors/state';
import {AppDispatch, Artwork, SFC} from 'types';
import {longDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';
import ArtworkTransferHistory from './ArtworkTransferHistory';
import * as S from './Styles';
import EditIcon from 'assets/edit.svg';
import DeleteIcon from 'assets/delete.svg';
import {UserLabelV2} from 'components/UserLabelV2';

const ArtworkDetails: SFC = () => {
  const [artworkDeleteModalIsOpen, toggleArtworkDeleteModal] = useToggle(false);
  const [artworkModalIsOpen, toggleArtworkModal] = useToggle(false);
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
    if (!artwork) return null;

    return (
      <S.ButtonContainer>
        {artwork.owner.id !== self.id ? (
          <Button onClick={handleBuy} text="Buy" />
        ) : (
          <Fragment>
            <Button onClick={toggleArtworkTransferModal} text="Transfer" />
            <S.InnerButtonContainer>
              <S.Button
                iconLeft={<img src={EditIcon} height={22} width={22} alt="edit" />}
                color={ButtonColor.secondary}
                onClick={toggleArtworkModal}
                text="Edit"
              />
              <S.Button
                iconLeft={<img src={DeleteIcon} height={22} width={22} alt="delete" />}
                onClick={toggleArtworkDeleteModal}
                text="Delete"
                color={ButtonColor.secondary}
                variant="primary"
              />
            </S.InnerButtonContainer>
          </Fragment>
        )}
      </S.ButtonContainer>
    );
  };

  const renderImgContainer = () => {
    if (!artwork) return null;

    return (
      <S.ImgContainer>
        {renderButtonContainer()}
        <S.Img alt="Artwork image" src={artwork.image} />
      </S.ImgContainer>
    );
  };

  const renderDetailsContainer = () => {
    if (!artwork) return null;

    return (
      <S.DetailsContainer>
        <S.Header>
          <S.Name>{artwork.name}</S.Name>
          {renderPriceContainer(artwork)}
        </S.Header>
        <S.DescriptionContainer>
          <S.DescriptionHeader>Description</S.DescriptionHeader>
          <S.Description>{artwork.description}</S.Description>
          <UserLabelV2 image={artwork.creator.avatar ?? ''} header="Creator" content={artwork.creator.username} />
          <UserLabelV2 image={artwork.owner.avatar ?? ''} header="Owner" content={artwork.owner.username} />
          <UserLabelV2 header="Created" content={longDate(artwork.created_date)} />
        </S.DescriptionContainer>
        <ArtworkTransferHistory />
      </S.DetailsContainer>
    );
  };

  const renderPriceContainer = ({price_amount, price_core}: Artwork) => {
    if (!price_amount || !price_core) return null;

    return <Price price_amount={price_amount} price_core={price_core} />;
  };

  if (!artwork) return null;

  return (
    <Fragment>
      <S.Container>
        {renderDetailsContainer()}
        {renderImgContainer()}
      </S.Container>
      {artworkDeleteModalIsOpen ? <ArtworkDeleteModal artworkId={artwork.id} close={toggleArtworkDeleteModal} /> : null}
      {artworkModalIsOpen ? (
        <ArtworkModal artwork={artwork} close={toggleArtworkModal} imageUrl={artwork.image} />
      ) : null}
      {artworkTransferModalIsOpen ? (
        <ArtworkTransferModal artwork={artwork} close={toggleArtworkTransferModal} />
      ) : null}
    </Fragment>
  );
};

export default ArtworkDetails;
