import {useEffect, useMemo, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import logo from 'assets/logo192.png';
import Icon from 'components/Icon';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import {SFC} from 'types';

import {bonsaiTrees} from '../data';

import * as S from './Styles';

const BonsaiDetail: SFC = ({className}) => {
  const {bonsaiId} = useParams();
  const bonsai = useMemo(() => bonsaiTrees.find((tree) => tree.id === bonsaiId), [bonsaiId]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedImageIndex(0);
    setIsModalOpen(false);
  }, [bonsai?.id]);

  if (!bonsai) {
    return <Navigate to="/bonsai/home" replace />;
  }

  const activeImage = bonsai.images[selectedImageIndex] ?? bonsai.images[0];

  const metadata: Array<{label: string; value: string}> = [
    {label: 'Species', value: bonsai.species},
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
          <span>All Bonsai Trees</span>
        </S.BackButton>
      </S.Header>

      <S.Content>
        <S.Layout>
          <S.MediaColumn>
            <S.MainImageButton onClick={() => setIsModalOpen(true)} type="button">
              <S.MainImage alt={bonsai.name} src={activeImage} />
            </S.MainImageButton>
            <S.Thumbnails>
              {bonsai.images.map((image, idx) => (
                <S.ThumbnailButton
                  $isActive={idx === selectedImageIndex}
                  key={image}
                  onClick={() => setSelectedImageIndex(idx)}
                  type="button"
                >
                  <S.ThumbnailImage alt={`${bonsai.name} thumbnail ${idx + 1}`} src={image} />
                </S.ThumbnailButton>
              ))}
            </S.Thumbnails>
          </S.MediaColumn>

          <S.DetailsColumn>
            <S.Title>{bonsai.name}</S.Title>
            <S.Subtitle>{bonsai.teaser}</S.Subtitle>
            <S.PriceRow>
              <S.TNBLogo alt="TNBC logo" src={logo} />
              <S.Price>{bonsai.price.toLocaleString()}</S.Price>
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
            <S.HighlightList>
              {bonsai.highlights.map((highlight: string) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </S.HighlightList>
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
