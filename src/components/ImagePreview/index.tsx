import React from 'react';
import MdiIcon from '@mdi/react';
import {mdiClose} from '@mdi/js';

import {SFC} from 'types';
import * as S from './Styles';

export interface ImagePreviewProps {
  onClear: () => void;
  src: string | null;
}

const ImagePreview: SFC<ImagePreviewProps> = ({className, onClear, src}) => {
  if (!src) return null;

  return (
    <S.Container className={className} onClick={onClear}>
      <S.CloseButtonContainer>
        <MdiIcon path={mdiClose} size="16px" />
      </S.CloseButtonContainer>
      <S.Img alt="Preview" src={src} />
    </S.Container>
  );
};

export default ImagePreview;
