import React from 'react';

import {DEFAULT_ASPECT_RATIO, YOUTUBE_EMBED_BASE_URL} from './constants';
import * as S from './Styles';

export interface YoutubeVideoProps {
  aspectRatio?: string;
  height?: number;
  title: string;
  youtubeID: string;
}

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
  aspectRatio = DEFAULT_ASPECT_RATIO,
  height = 450,
  title,
  youtubeID,
}) => {
  const allowSettings = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  const videoSrc = `${YOUTUBE_EMBED_BASE_URL}${youtubeID}`;

  return (
    <S.Container aspectRatio={aspectRatio}>
      <iframe
        allow={allowSettings}
        allowFullScreen
        aria-label={`YouTube video player for ${title}`}
        height={`${height}px`}
        src={videoSrc}
        title={title}
        width="100%"
      ></iframe>
    </S.Container>
  );
};

export default YoutubeVideo;
