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
      {/* Keyed by its source so that changing the image replaces the element instead of showing the previous image
          until the next one has loaded */}
      <S.Img alt="Full screen preview" key={src} onClick={(e) => e.stopPropagation()} src={src} />
    </S.Container>
  );
};

export default FullScreenImage;
