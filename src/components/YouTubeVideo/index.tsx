import {FC} from 'react';

import {YOUTUBE_EMBED_BASE_URL} from 'constants/youtube';
import * as S from './Styles';

export interface YoutubeVideoProps {
  height?: number;
  title: string;
  youtubeID: string;
}

const YouTubeVideo: FC<YoutubeVideoProps> = ({height = 450, title, youtubeID}) => {
  const allowSettings = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  const videoSrc = `${YOUTUBE_EMBED_BASE_URL}${youtubeID}`;

  return (
    <S.Container>
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

export default YouTubeVideo;
