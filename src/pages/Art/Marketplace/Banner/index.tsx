import {useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import {SFC} from 'types';
import Artworks from './artworks.png';
import * as S from './Styles';

const Banner: SFC = ({className}) => {
  const navigate = useNavigate();

  return (
    <S.Container className={className}>
      <S.Left>
        <div>
          <S.Heading>Craft Your Vision, Reap Rewards</S.Heading>
          <S.SubHeading>Explore the dynamic world of creating and selling your own art.</S.SubHeading>
        </div>
        <div>
          <Button onClick={() => navigate('/art/create')} text="Create new art" />
        </div>
      </S.Left>
      <S.Right>
        <S.Img alt="artworks" src={Artworks} />
      </S.Right>
    </S.Container>
  );
};

export default Banner;
