import {useState} from 'react';

import * as S from '../Styles';

const COLORS = ['#2c6b55', '#b8672e', '#4a7fa8', '#8a5a9c', '#b0563f', '#56803a', '#7a6a2e', '#3f7a86'];
const avatarColor = (name: string) =>
  COLORS[Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0) % COLORS.length];

// The player's own picture when they have one, otherwise their initial on a color drawn from the name
const PlayerAvatar = ({
  avatar,
  name,
  size = 30,
  title,
}: {
  avatar?: string | null;
  name: string;
  size?: number;
  title?: string;
}) => {
  const [broken, setBroken] = useState<string | null>(null);
  const picture = avatar && avatar !== broken ? avatar : null;
  return (
    <S.Avatar $color={avatarColor(name)} $size={size} aria-hidden={title ? undefined : true} title={title}>
      {picture ? <img alt="" draggable={false} onError={() => setBroken(picture)} src={picture} /> : name.slice(0, 1)}
    </S.Avatar>
  );
};

export default PlayerAvatar;
