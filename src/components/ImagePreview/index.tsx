import {GenericVoidFunction, SFC} from 'types';
import {mdiClose} from '@mdi/js';
import * as S from './Styles';
import MdiIcon from '@mdi/react';
import React from 'react';

export interface ImagePreviewProps {
  onClear: GenericVoidFunction;
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
