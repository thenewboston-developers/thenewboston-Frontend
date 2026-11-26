import {useState} from 'react';

import * as S from '../Styles';

const SHIELD = 'M24 2.5 43.5 8v17.5C43.5 38.2 35.4 47.3 24 51.5 12.6 47.3 4.5 38.2 4.5 25.5V8Z';

// Dark text on light banners and light text on dark ones, for emblems written in letters instead of emoji
const readable = (color: string) => {
  const value = /^#[0-9a-f]{6}$/i.test(color) ? parseInt(color.slice(1), 16) : 0x46634a;
  // eslint-disable-next-line no-bitwise
  const luminance = (0.299 * (value >> 16) + 0.587 * ((value >> 8) & 255) + 0.114 * (value & 255)) / 255;
  return luminance > 0.62 ? '#1c2b25' : '#ffffff';
};

// A tribe's uploaded picture framed in its color. Tribes without one keep the shield and its emoji.
const Emblem = ({
  color,
  emblem,
  image,
  size = 40,
}: {
  color: string;
  emblem: string;
  image?: string | null;
  size?: number;
}) => {
  const [broken, setBroken] = useState<string | null>(null);
  const fill = /^#[0-9a-f]{6}$/i.test(color) ? color : '#46634a';
  if (image && image !== broken)
    return (
      <S.EmblemImage $color={fill} $size={size} aria-hidden>
        <img alt="" draggable={false} onError={() => setBroken(image)} src={image} />
      </S.EmblemImage>
    );
  const glyphs = Array.from((emblem || '🛡️').replace(/[️‍]/g, ''));
  const scale = glyphs.length > 2 ? 0.2 + 0.4 / glyphs.length : 0.46;
  return (
    <S.Emblem $size={size} aria-hidden>
      <svg height={(size * 54) / 48} viewBox="0 0 48 54" width={size}>
        <path d={SHIELD} fill={fill} />
        <path d="M24 2.5 43.5 8v17.5C43.5 38.2 35.4 47.3 24 51.5Z" fill="rgba(0, 0, 0, 0.16)" />
        <path
          d="M24 6.2 40 10.7v14.8c0 10.6-6.7 18.4-16 22.2-9.3-3.8-16-11.6-16-22.2V10.7Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.3"
        />
      </svg>
      <span style={{color: readable(fill), fontSize: Math.round(size * scale)}}>{emblem || '🛡️'}</span>
    </S.Emblem>
  );
};

export default Emblem;
