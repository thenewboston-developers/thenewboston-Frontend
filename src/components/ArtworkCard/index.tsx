import {Link} from 'react-router-dom';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';
import {useSelector} from 'react-redux';

import {Artwork, SFC} from 'types';
import {getSelf} from 'selectors/state';
import {useToggle} from 'hooks';
import * as S from './Styles';
import ArtworkDeleteModal from 'modals/ArtworkDeleteModal';
import ArtworkModal from 'modals/ArtworkModal';
import Badge, {BadgeStyle} from 'components/Badge';
import Price from 'components/Price';

export interface ArtworkCardProps {
  artwork: Artwork;
  pageName: string;
}

const ArtworkCard: SFC<ArtworkCardProps> = ({artwork, className, pageName}) => {
  const [artworkDeleteModalIsOpen, toggleArtworkDeleteModal] = useToggle(false);
  const [artworkModalIsOpen, toggleArtworkModal] = useToggle(false);
  const self = useSelector(getSelf);
  const enum badgeTexts {
    SALE = 'For Sale',
    DRAFT = 'Draft',
  }

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
          {pageName === 'profile' && (
            <S.BadgeContainer>
              <Badge
                badgeStyle={BadgeStyle.draft}
                children={artwork.price_amount ? badgeTexts.SALE : badgeTexts.DRAFT}
              />
            </S.BadgeContainer>
          )}
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
