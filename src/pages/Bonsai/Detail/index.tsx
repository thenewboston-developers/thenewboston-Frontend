import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft, mdiDotsVertical} from '@mdi/js';

import {deleteBonsai, getBonsai} from 'api/bonsais';
import DropdownMenu from 'components/DropdownMenu';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import {ToastType} from 'enums';
import ConfirmationModal from 'modals/ConfirmationModal';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import {getSelf} from 'selectors/state';
import {Bonsai, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

const BonsaiDetail: SFC = ({className}) => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const [bonsai, setBonsai] = useState<Bonsai | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isAdmin = self.is_staff;

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setSelectedImageIndex(0);
    setIsModalOpen(false);
    (async () => {
      try {
        const data = await getBonsai(id);
        setBonsai(data);
        setNotFound(false);
      } catch (error: any) {
        if (error?.response?.status === 404) {
          setNotFound(true);
        } else {
          displayErrorToast('Unable to load bonsai');
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const handleEdit = () => {
    if (!bonsai) return;
    navigate(`/bonsai/edit/${bonsai.id}`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!bonsai || isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteBonsai(bonsai.id);
      displayToast('Bonsai deleted', ToastType.SUCCESS);
      setIsDeleteModalOpen(false);
      navigate('/bonsai/manage');
    } catch (error) {
      displayErrorToast('Unable to delete bonsai');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!id || (notFound && !isLoading)) {
    return <Navigate to="/bonsai/home" replace />;
  }

  if (isLoading) {
    return (
      <S.Container className={className}>
        <S.Header>
          <S.BackButton onClick={() => navigate('/bonsai/home')}>
            <Icon icon={mdiArrowLeft} size={20} />
            <span>All Bonsai</span>
          </S.BackButton>
        </S.Header>
        <S.LoadingState>
          <Loader />
        </S.LoadingState>
      </S.Container>
    );
  }

  if (!bonsai) return null;

  const hasImages = bonsai.images.length > 0;
  const activeImage = bonsai.images[selectedImageIndex]?.url ?? bonsai.images[0]?.url ?? '';

  const metadata: Array<{label: string; value: string}> = [
    {label: 'Species', value: bonsai.species},
    {label: 'Genus', value: bonsai.genus},
    {label: 'Cultivar', value: bonsai.cultivar},
    {label: 'Style', value: bonsai.style},
    {label: 'Size', value: bonsai.size},
    {label: 'Origin', value: bonsai.origin},
    {label: 'Pot', value: bonsai.pot},
  ];

  const menuOptions = [
    {
      label: 'Edit',
      onClick: handleEdit,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  return (
    <S.Container className={className}>
      <S.Header>
        <S.BackButton onClick={() => navigate('/bonsai/home')}>
          <Icon icon={mdiArrowLeft} size={20} />
          <span>All Bonsai</span>
        </S.BackButton>
        {isAdmin ? <DropdownMenu icon={mdiDotsVertical} options={menuOptions} /> : null}
      </S.Header>

      <S.Content>
        <S.Layout>
          <S.MediaColumn>
            <S.MainImageButton disabled={!hasImages} onClick={() => setIsModalOpen(true)} type="button">
              {hasImages && activeImage ? (
                <S.MainImage alt={bonsai.name} src={activeImage} />
              ) : (
                <S.ImagePlaceholder>No images available</S.ImagePlaceholder>
              )}
            </S.MainImageButton>
            {bonsai.images.length > 1 ? (
              <S.Thumbnails>
                {bonsai.images.map((image, idx) => (
                  <S.ThumbnailButton
                    $isActive={idx === selectedImageIndex}
                    key={image.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    type="button"
                  >
                    <S.ThumbnailImage alt={`${bonsai.name} thumbnail ${idx + 1}`} src={image.url ?? ''} />
                  </S.ThumbnailButton>
                ))}
              </S.Thumbnails>
            ) : null}
          </S.MediaColumn>

          <S.DetailsColumn>
            <S.Title>{bonsai.name}</S.Title>
            <S.Subtitle>{bonsai.teaser}</S.Subtitle>
            <S.PriceRow>
              {bonsai.price_currency?.logo ? (
                <S.CurrencyLogo alt={`${bonsai.price_currency.ticker} logo`} src={bonsai.price_currency.logo} />
              ) : null}
              <S.Price>
                {bonsai.price_amount.toLocaleString()} {bonsai.price_currency?.ticker}
              </S.Price>
            </S.PriceRow>
            <S.Divider />
            <S.DetailList>
              {metadata.map((meta) => (
                <S.DetailRow key={meta.label}>
                  <S.DetailLabel>{meta.label}</S.DetailLabel>
                  <S.DetailValue>{meta.value}</S.DetailValue>
                </S.DetailRow>
              ))}
            </S.DetailList>
            <S.Description>{bonsai.description}</S.Description>
            <S.HighlightTitle>Included Highlights</S.HighlightTitle>
            {bonsai.highlights.length ? (
              <S.HighlightList>
                {bonsai.highlights.map((highlight) => (
                  <li key={highlight.id}>{highlight.text}</li>
                ))}
              </S.HighlightList>
            ) : (
              <S.NoHighlights>Highlights coming soon.</S.NoHighlights>
            )}
          </S.DetailsColumn>
        </S.Layout>
      </S.Content>

      {isModalOpen && activeImage ? (
        <FullScreenImageModal close={() => setIsModalOpen(false)} imageSrc={activeImage} />
      ) : null}
      {isDeleteModalOpen ? (
        <ConfirmationModal
          close={closeDeleteModal}
          confirmText={isDeleting ? 'Deleting...' : 'Delete'}
          header="Delete Bonsai"
          message="Are you sure you want to delete this bonsai? This action cannot be undone."
          onConfirm={handleConfirmDelete}
        />
      ) : null}
    </S.Container>
  );
};

export default BonsaiDetail;
