import {SFC} from 'types';

import * as S from './Styles';

export interface FullScreenImageProps {
  onClick: () => void;
  src: string;
}

const FullScreenImage: SFC<FullScreenImageProps> = ({className, onClick, src}) => {
  if (!src) return null;

  return (
    <S.Container className={className} onClick={onClick}>
      <S.Img alt="Full screen preview" onClick={(e) => e.stopPropagation()} src={src} />
    </S.Container>
  );
};

export default FullScreenImage;
