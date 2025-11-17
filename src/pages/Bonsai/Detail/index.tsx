import {useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import {getBonsai} from 'api/bonsais';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import {Bonsai, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const BonsaiDetail: SFC = ({className}) => {
  const {bonsaiId} = useParams();
  const navigate = useNavigate();
  const [bonsai, setBonsai] = useState<Bonsai | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!bonsaiId) return;
    setIsLoading(true);
    setSelectedImageIndex(0);
    setIsModalOpen(false);
    (async () => {
      try {
        const data = await getBonsai(bonsaiId);
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
  }, [bonsaiId]);

  if (!bonsaiId || (notFound && !isLoading)) {
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

  return (
    <S.Container className={className}>
      <S.Header>
        <S.BackButton onClick={() => navigate('/bonsai/home')}>
          <Icon icon={mdiArrowLeft} size={20} />
          <span>All Bonsai</span>
        </S.BackButton>
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
            {hasImages ? (
              <S.Thumbnails>
                {bonsai.images.map((image, idx) => (
                  <S.ThumbnailButton
                    $isActive={idx === selectedImageIndex}
                    key={image.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    type="button"
                  >
                    <S.ThumbnailImage alt={`${bonsai.name} thumbnail ${idx + 1}`} src={image.url} />
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
                {bonsai.price_amount.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{' '}
                {bonsai.price_currency?.ticker}
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
    </S.Container>
  );
};

export default BonsaiDetail;
