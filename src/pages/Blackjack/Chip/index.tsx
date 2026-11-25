import {CSSProperties, memo} from 'react';

import {getChips, getChipStyle} from '../utils';

import * as S from './Styles';

interface ChipProps {
  className?: string;
  value: number;
}

interface ChipStackProps {
  amount: number;
  className?: string;
}

const INSERT_LENGTH = (2 * Math.PI * 20) / 16;

const formatValue = (value: number): string => (value >= 1000 ? `${value / 1000}K` : String(value));

const getFontSize = (label: string) => {
  if (label.length <= 2) return 15.5;
  return label.length === 3 ? 12.5 : 10.5;
};

// A casino chip seen from above, in the color of its denomination
export const Chip = memo(({className, value}: ChipProps) => {
  const {base, face, inlay, text} = getChipStyle(value);
  const label = formatValue(value);
  return (
    <S.Chip aria-hidden="true" className={className} viewBox="0 0 48 48">
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
    </S.Chip>
  );
});

Chip.displayName = 'Chip';

// A wager on the felt: its chips stacked largest first, each one dropping onto the stack as it is added
const ChipStack = ({amount, className}: ChipStackProps) => (
  <S.Stack className={className}>
    {getChips(amount).map((value, level) => (
      // Chips are told apart by their place in the stack
      // eslint-disable-next-line react/no-array-index-key
      <S.Layer $edge={getChipStyle(value).base} key={level} style={{'--level': level} as CSSProperties}>
        <Chip value={value} />
      </S.Layer>
    ))}
  </S.Stack>
);

export default ChipStack;
