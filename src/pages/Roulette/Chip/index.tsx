import {formatChip, getChipStyle, getStackHeight} from '../utils';

import * as S from './Styles';

interface ChipProps {
  amount: number;
  className?: string;
  // Draws the chips underneath, for a wager sitting on the felt
  stacked?: boolean;
}

const INSERT_LENGTH = (2 * Math.PI * 20) / 16;

const getFontSize = (label: string) => {
  if (label.length <= 2) return 15.5;
  if (label.length === 3) return 12.5;
  return label.length === 4 ? 10.5 : 9;
};

// A casino chip in the color of the largest denomination its amount contains, with the amount on its face
const Chip = ({amount, className, stacked = false}: ChipProps) => {
  const {base, face, inlay, text} = getChipStyle(amount);
  const label = formatChip(amount);
  return (
    <S.Chip $edge={base} $height={stacked ? getStackHeight(amount) : 1} className={className}>
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="24" fill={base} r="23.5" />
        <circle
          cx="24"
          cy="24"
          fill="none"
          r="20"
          stroke={inlay}
          strokeDasharray={`${INSERT_LENGTH} ${INSERT_LENGTH}`}
          strokeWidth="7"
          transform="rotate(-11.25 24 24)"
        />
        <circle cx="24" cy="24" fill="none" opacity="0.4" r="23" stroke="#000000" strokeWidth="1" />
        <circle cx="24" cy="24" fill={face} r="15.6" />
        <circle cx="24" cy="24" fill="none" opacity="0.65" r="15.6" stroke={inlay} strokeWidth="0.9" />
        <path d="M5 21a19.5 19.5 0 0 1 38 0a36 36 0 0 0-38 0Z" fill="#ffffff" opacity="0.14" />
        <text
          dominantBaseline="central"
          fill={text}
          fontSize={getFontSize(label)}
          fontWeight="800"
          textAnchor="middle"
          x="24"
          y="24.4"
        >
          {label}
        </text>
      </svg>
    </S.Chip>
  );
};

export default Chip;
