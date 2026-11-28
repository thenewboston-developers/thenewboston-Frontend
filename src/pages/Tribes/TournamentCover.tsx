import {useState} from 'react';
import {Swords} from 'lucide-react';

import * as S from './DiscoveryStyles';

const CoverImage = ({src}: {src: string}) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (failed) return null;
  return (
    <S.CoverImage
      $loaded={loaded}
      alt=""
      decoding="async"
      loading="lazy"
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      src={src}
    />
  );
};

// Covers are decorative; the tournament's name, schedule and capacity remain readable below the artwork.
const TournamentCover = ({src}: {src?: string | null}) => (
  <S.Cover aria-hidden>
    <S.CoverFallback>
      <Swords size={42} strokeWidth={1.3} />
      <span>Tribes</span>
    </S.CoverFallback>
    {src && <CoverImage key={src} src={src} />}
  </S.Cover>
);

export default TournamentCover;
