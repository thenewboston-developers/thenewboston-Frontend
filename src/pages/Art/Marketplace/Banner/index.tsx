import {useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import {SFC} from 'types';
import ArtIcon from './art-icon.svg';
import Artworks from './artworks.png';
import * as S from './Styles';

const Banner: SFC = ({className}) => {
  const navigate = useNavigate();

  return (
    <S.Container className={className}>
      <S.Left>
        <div>
          <S.HeaderContainer>
            <S.Icon alt="artwork-icon" src={ArtIcon} />
            <S.Heading>Craft Your Vision, Reap Rewards</S.Heading>
          </S.HeaderContainer>
          <S.SubHeading>Explore the dynamic world of creating and selling your own art.</S.SubHeading>
        </div>
        <div>
          <Button onClick={() => navigate('/art/create')} text="Create new art" />
        </div>
      </S.Left>
      <S.Right>
        <S.Img alt="artworks" src={Artworks} />
        <S.ImgOverlay />
      </S.Right>
    </S.Container>
  );
};

export default Banner;
