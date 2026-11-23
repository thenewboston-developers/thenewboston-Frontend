import {FC} from 'react';

const CYAN = '#67e8f9';
const ROW_HEIGHT = 28;
const TRACK_WIDTH = 168;

// How much of each order is filled, from the settled ones at the top to the one that was only just placed
const FILLED_SHARES = [1, 1, 0.64, 0.3, 0];

const ROWS = FILLED_SHARES.map((filledShare, index) => ({
  amountWidth: index % 2 ? 58 : 42,
  filledShare,
  opacity: 1 - index * 0.13,
  x: 428 + index * 12,
  y: 26 + index * 38,
}));

const Ledger: FC = () => {
  return (
    <>
      <defs>
        <linearGradient id="banner-art-ledger-fill" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={CYAN} stopOpacity="0.5" />
          <stop offset="1" stopColor="#ecfeff" />
        </linearGradient>
      </defs>
      <g transform="rotate(-7 600 120)">
        {ROWS.map(({amountWidth, filledShare, opacity, x, y}) => (
          <g key={y} opacity={opacity}>
            <rect
              fill="#ffffff"
              fillOpacity="0.07"
              height={ROW_HEIGHT}
              rx={ROW_HEIGHT / 2}
              stroke="#ffffff"
              strokeOpacity="0.16"
              width="330"
              x={x}
              y={y}
            />
            {filledShare === 1 ? (
              <>
                <circle cx={x + 14} cy={y + 14} fill={CYAN} r="6.5" />
                <path
                  d={`M${x + 11},${y + 14.2}l2.2,2.2l4-4.4`}
                  fill="none"
                  stroke="#0f1f6b"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                />
              </>
            ) : (
              <circle
                cx={x + 14}
                cy={y + 14}
                fill="none"
                r="5.75"
                stroke={filledShare ? CYAN : '#ffffff'}
                strokeOpacity={filledShare ? 1 : 0.4}
                strokeWidth="1.5"
              />
            )}
            <rect fill="#ffffff" fillOpacity="0.14" height="6" rx="3" width={TRACK_WIDTH} x={x + 32} y={y + 11} />
            {!!filledShare && (
              <rect
                fill="url(#banner-art-ledger-fill)"
                height="6"
                rx="3"
                width={TRACK_WIDTH * filledShare}
                x={x + 32}
                y={y + 11}
              />
            )}
            <rect fill="#ffffff" fillOpacity="0.2" height="8" rx="4" width={amountWidth} x={x + 216} y={y + 10} />
          </g>
        ))}
      </g>
    </>
  );
};

export default Ledger;
