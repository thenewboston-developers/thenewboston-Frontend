import * as S from './Styles';

interface ChipProps {
  amount: number;
  className?: string;
}

const INSERT_LENGTH = (2 * Math.PI * 20) / 16;

const formatChip = (amount: number) => {
  if (amount >= 1000000) return `${Math.floor(amount / 100000) / 10}M`;
  if (amount >= 1000) return `${Math.floor(amount / 100) / 10}K`;
  return String(amount);
};

const getFontSize = (label: string) => {
  if (label.length <= 2) return 16;
  return label.length === 3 ? 13 : 10.5;
};

// A gold casino chip with the bet on its face
const Chip = ({amount, className}: ChipProps) => {
  const label = formatChip(amount);
  return (
    <S.Chip className={className}>
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="24" fill="#b88a34" r="23.5" />
        <circle
          cx="24"
          cy="24"
          fill="none"
          r="20"
          stroke="#fdf3d2"
          strokeDasharray={`${INSERT_LENGTH} ${INSERT_LENGTH}`}
          strokeWidth="7"
          transform="rotate(-11.25 24 24)"
        />
        <circle cx="24" cy="24" fill="none" opacity="0.4" r="23" stroke="#000000" strokeWidth="1" />
        <circle cx="24" cy="24" fill="#f6dc94" r="15.6" />
        <circle cx="24" cy="24" fill="none" opacity="0.7" r="15.6" stroke="#a57a2c" strokeWidth="0.9" />
        <path d="M5 21a19.5 19.5 0 0 1 38 0a36 36 0 0 0-38 0Z" fill="#ffffff" opacity="0.18" />
        <text
          dominantBaseline="central"
          fill="#3b2a07"
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
