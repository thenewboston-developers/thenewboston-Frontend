import DefaultImage from 'assets/default_image.svg';
import {SFC} from 'types';
import * as S from './Styles';

export interface EmptyImageProps {
  children: string;
  size?: string;
}

const EmptyImage: SFC<EmptyImageProps> = ({children, size = '40px'}) => {
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
