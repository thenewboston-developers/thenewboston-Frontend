import React from 'react';

import {SFC} from 'types';
import * as S from './Styles';

export interface ProfileImagePreviewProps {
  src: string | null;
}

const ProfileImagePreview: SFC<ProfileImagePreviewProps> = ({className, src}) => {
  if (!src) return null;

  return (
    <S.Container className={className}>
      <S.Img alt="Preview" src={src} />
    </S.Container>
  );
};

export default ProfileImagePreview;
