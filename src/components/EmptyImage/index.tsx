import DefaultImage from 'assets/default-image.svg';
import {SFC} from 'types';
import * as S from './Styles';

export interface EmptyImageProps {
  size?: string;
  children: string;
}

const EmptyImage: SFC<EmptyImageProps> = ({size = '40px', children}) => {
  return (
    <>
      <S.ImgWrapper>
        <S.Img alt="image" src={DefaultImage} $size={size} />
      </S.ImgWrapper>
      <S.Text>{children}</S.Text>
    </>
  );
};

export default EmptyImage;
