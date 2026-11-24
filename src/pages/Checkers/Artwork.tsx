import {board} from './theme';
import {INITIAL_BOARD} from './utils';

const Artwork = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    style={{display: 'block', height: 'auto', maxWidth: 500, width: '100%'}}
    viewBox="0 0 440 440"
  >
    <rect fill={board.forest} height="440" rx="28" width="440" />
    {INITIAL_BOARD.map((piece, index) => {
      const x = 28 + (index % 8) * 48;
      const y = 28 + Math.floor(index / 8) * 48;
      return (
        <g key={index}>
          <rect
            fill={(Math.floor(index / 8) + (index % 8)) % 2 ? board.squareDark : board.squareLight}
            height="48"
            width="48"
            x={x}
            y={y}
          />
          {!!piece && (
            <>
              <circle cx={x + 24} cy={y + 26} fill="#162d22" opacity="0.35" r="19" />
              <circle
                cx={x + 24}
                cy={y + 22}
                fill={piece > 0 ? board.pieceLight : board.pieceDark}
                r="18"
                stroke={piece > 0 ? '#fffae8' : '#526450'}
                strokeWidth="2"
              />
              <circle cx={x + 24} cy={y + 22} fill="none" r="12" stroke={piece > 0 ? '#c9bea0' : '#53624c'} />
            </>
          )}
        </g>
      );
    })}
  </svg>
);

export default Artwork;
