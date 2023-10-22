import {useDispatch} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import {deleteArtwork} from 'dispatchers/artworks';
import {ToastType} from 'enums';
import {AppDispatch, Artwork, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: SFC<ArtworkCardProps> = ({artwork, className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deleteArtwork(artwork.id));
      displayToast('Artwork deleted!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting artwork');
    }
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: () => {},
    },
    {
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  const renderDropdownMenu = () => {
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return (
    <S.Container className={className}>
      <S.Thumbnail thumbnailUrl={artwork.image} />
      <S.Bottom>
        <S.Text>
          <S.Name>{artwork.name}</S.Name>
          <S.Description>{artwork.description}</S.Description>
        </S.Text>
        {renderDropdownMenu()}
      </S.Bottom>
    </S.Container>
  );
};

export default ArtworkCard;
