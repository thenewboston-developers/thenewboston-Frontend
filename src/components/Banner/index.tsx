import {useNavigate} from 'react-router-dom';

import ArtIcon from 'assets/art_icon.svg';
import Artworks from './artworks.png';
import Button from 'components/Button';
import {SFC} from 'types';

import * as S from './Styles';

export interface BannerProps {
  heading: string;
  icon: string;
  subHeading: string;
}

const Banner: SFC<BannerProps> = ({className, heading, icon, subHeading}) => {
  const navigate = useNavigate();

  return (
    <S.Container className={className} $height={icon === ArtIcon ? '194px' : '154px'}>
      <S.Left>
        <div>
          <S.HeaderContainer>
            <S.Icon alt="icon" src={icon} />
            <S.Heading>{heading}</S.Heading>
          </S.HeaderContainer>
          <S.SubHeading>{subHeading}</S.SubHeading>
        </div>
        {icon === ArtIcon && (
          <div>
            <Button onClick={() => navigate('/art/create')} text="Create new art" />
          </div>
        )}
      </S.Left>
      <S.Right>
        <S.Img alt="artworks" src={Artworks} />
        <S.ImgOverlay />
      </S.Right>
    </S.Container>
  );
};

export default Banner;
