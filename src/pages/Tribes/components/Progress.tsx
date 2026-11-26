import * as S from '../Styles';

const Progress = ({
  active,
  color,
  dark,
  label,
  max,
  thick,
  value,
}: {
  active?: boolean;
  color?: string;
  dark?: boolean;
  label: string;
  max: number;
  thick?: boolean;
  value: number;
}) => {
  const limit = Math.max(max, 1);
  const clamped = Math.min(Math.max(value, 0), limit);
  return (
    <S.ProgressTrack
      $dark={dark}
      $thick={thick}
      aria-label={label}
      aria-valuemax={limit}
      aria-valuemin={0}
      aria-valuenow={clamped}
      role="progressbar"
    >
      <S.ProgressFill $active={active} $color={color} style={{width: `${(clamped / limit) * 100}%`}} />
    </S.ProgressTrack>
  );
};

export default Progress;
