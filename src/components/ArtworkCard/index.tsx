import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';

import Price from 'components/Price';
import {useToggle} from 'hooks';
import ArtworkDeleteModal from 'modals/ArtworkDeleteModal';
import ArtworkModal from 'modals/ArtworkModal';
import {getSelf} from 'selectors/state';
import {Artwork, SFC} from 'types';
import * as S from './Styles';

export interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: SFC<ArtworkCardProps> = ({artwork, className}) => {
  const [artworkDeleteModalIsOpen, toggleArtworkDeleteModal] = useToggle(false);
  const [artworkModalIsOpen, toggleArtworkModal] = useToggle(false);
  const self = useSelector(getSelf);

  const menuOptions = [
    {
      label: 'Edit',
      menuIcon: mdiSquareEditOutline,
      onClick: toggleArtworkModal,
    },
    {
      label: 'Delete',
      menuIcon: mdiDeleteOutline,
      onClick: toggleArtworkDeleteModal,
    },
  ];

  const renderDetails = () => {
    return (
      <S.Details>
        <S.Top>
          <S.TextContainer>
            <Link to={`/art/artworks/${artwork.id}`}>
              <S.Name>{artwork.name}</S.Name>
            </Link>
            <S.Description>{artwork.description}</S.Description>
          </S.TextContainer>
          {renderDropdownMenu()}
        </S.Top>
        <S.Bottom>{renderPrice()}</S.Bottom>
      </S.Details>
    );
  };

  const renderDropdownMenu = () => {
    if (artwork.owner.id !== self.id) return null;
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderPrice = () => {
    if (!artwork.price_amount || !artwork.price_core) return null;
    return <Price price_amount={artwork.price_amount} price_core={artwork.price_core} />;
  };

  return (
    <>
      <S.Container className={className}>
        <Link to={`/art/artworks/${artwork.id}`}>
          <S.Thumbnail thumbnailUrl={artwork.image} />
        </Link>
        {renderDetails()}
      </S.Container>
      {artworkDeleteModalIsOpen ? <ArtworkDeleteModal artworkId={artwork.id} close={toggleArtworkDeleteModal} /> : null}
      {artworkModalIsOpen ? (
        <ArtworkModal artwork={artwork} close={toggleArtworkModal} imageUrl={artwork.image} />
      ) : null}
    </>
  );
};

export default ArtworkCard;
