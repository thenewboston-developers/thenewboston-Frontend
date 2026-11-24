import {ReactNode, useId} from 'react';

import {board} from '../theme';

import * as S from './Styles';

// Every emblem is decorative: the headings and text next to them carry the meaning.

type PieceColor = 'gold' | 'ivory' | 'charcoal';

const CROWN_PATH = 'M-8 3L-9.5-6L-4.5-2L0-8.5L4.5-2L9.5-6L8 3Z';
const DARK_SQUARE = board.squareDark;
const FRAME = board.edge;
const FRAME_LINE = board.line;
const GOLD = board.gold;
const LIGHT_SQUARE = board.squareLight;

const PIECES: Record<PieceColor, {edge: string; ring: string; rim: string; top: string}> = {
  gold: {edge: '#8f6416', ring: '#d6a23a', rim: '#ffe9a8', top: GOLD},
  ivory: {edge: '#b3946a', ring: '#e2c9a1', rim: '#fffaf0', top: board.pieceLight},
  charcoal: {edge: board.edge, ring: '#65765a', rim: '#91a687', top: board.pieceDark},
};

const SCENE_OFFSET = 10;
const SCENE_PIECES: [PieceColor, number, number][] = [
  ['charcoal', 0, 1],
  ['charcoal', 0, 7],
  ['charcoal', 1, 6],
  ['ivory', 2, 1],
  ['ivory', 2, 3],
  ['ivory', 2, 7],
];
const SCENE_SQUARE = 40;

const sceneCenter = (index: number) => SCENE_OFFSET + index * SCENE_SQUARE + SCENE_SQUARE / 2;

// Clip path references break on some characters React puts in generated IDs
const useSvgId = (prefix: string) => `${prefix}-${useId().replace(/[^\w-]/g, '')}`;

interface PieceProps {
  color: PieceColor;
  king?: boolean;
  r: number;
  x: number;
  y: number;
}

// A checker seen from above, with the thickness of the disc showing underneath. A king is a second disc on top.
const Piece = ({color, king = false, r, x, y}: PieceProps) => {
  const {edge, ring, rim, top} = PIECES[color];
  const renderDisc = (cy: number) => (
    <>
      <circle cx={x} cy={cy + r * 0.26} fill={edge} r={r} />
      <circle cx={x} cy={cy} fill={top} r={r} stroke={rim} strokeWidth={r * 0.1} />
      <circle cx={x} cy={cy} fill="none" r={r * 0.6} stroke={ring} strokeWidth={r * 0.12} />
    </>
  );
  return (
    <g>
      {renderDisc(y)}
      {king && renderDisc(y - r * 0.42)}
    </g>
  );
};

interface SquaresProps {
  cols: number;
  // The squares where (row + column) % 2 equals this are dark, the only ones a piece can stand on
  darkParity: 0 | 1;
  rows: number;
  size: number;
  x: number;
  y: number;
}

const Squares = ({cols, darkParity, rows, size, x, y}: SquaresProps) => (
  <>
    {Array.from({length: rows * cols}, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      return (
        <rect
          fill={(row + col) % 2 === darkParity ? DARK_SQUARE : LIGHT_SQUARE}
          height={size}
          key={index}
          width={size}
          x={x + col * size}
          y={y + row * size}
        />
      );
    })}
  </>
);

// A three by three corner of the board inside a lacquered frame, dark squares in the corners and the middle
const Tile = ({children}: {children: ReactNode}) => {
  const clip = useSvgId('checkers-tile');
  return (
    <S.Tile aria-hidden="true" viewBox="0 0 60 60">
      <defs>
        <clipPath id={clip}>
          <rect height="48" rx="7" width="48" x="6" y="6" />
        </clipPath>
      </defs>
      <rect fill={FRAME} height="59" rx="14" stroke={FRAME_LINE} width="59" x="0.5" y="0.5" />
      <g clipPath={`url(#${clip})`}>
        <Squares cols={3} darkParity={0} rows={3} size={16} x={6} y={6} />
      </g>
      {children}
    </S.Tile>
  );
};

// The king's row before anyone has earned a place on it: empty seats on the dark squares and a crown over the first
export const EmptyKingsRow = () => (
  <S.KingsRow aria-hidden="true" viewBox="0 0 333 76">
    <rect fill={FRAME} height="51" rx="12" stroke={FRAME_LINE} width="332" x="0.5" y="24.5" />
    <Squares cols={8} darkParity={1} rows={1} size={40} x={6} y={30.5} />
    {[1, 3, 5, 7].map((col) => (
      <circle
        cx={6 + col * 40 + 20}
        cy="50.5"
        fill="none"
        key={col}
        r="12.5"
        stroke={board.mist}
        strokeDasharray="3 4"
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
    ))}
    <path
      d={CROWN_PATH}
      fill={GOLD}
      stroke="#8f6416"
      strokeLinejoin="round"
      strokeWidth="1"
      transform="translate(66 13)"
    />
  </S.KingsRow>
);

// A checker hopping between the two dark squares of a tiny board while something loads
export const HopLoader = () => {
  const clip = useSvgId('checkers-hop');
  return (
    <S.Hop aria-hidden="true" viewBox="0 0 40 40">
      <defs>
        <clipPath id={clip}>
          <rect height="40" rx="8" width="40" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <Squares cols={2} darkParity={0} rows={2} size={20} x={0} y={0} />
      </g>
      <rect fill="none" height="39" rx="7.5" stroke={FRAME_LINE} width="39" x="0.5" y="0.5" />
      <S.HopPiece>
        <Piece color="charcoal" r={6.5} x={10} y={9.5} />
      </S.HopPiece>
    </S.Hop>
  );
};

// A slice of a game in progress: a charcoal checker jumps an ivory one and lands on the gold dot, then the board resets.
// With reduced motion the jump stays drawn as a dotted arc.
export const JumpScene = () => {
  const clip = useSvgId('checkers-scene');
  return (
    <S.Scene aria-hidden="true" viewBox="0 0 340 140">
      <defs>
        <clipPath id={clip}>
          <rect height="120" rx="8" width="320" x="10" y="10" />
        </clipPath>
      </defs>
      <rect fill={FRAME} height="139" rx="16" stroke={FRAME_LINE} width="339" x="0.5" y="0.5" />
      <g clipPath={`url(#${clip})`}>
        <Squares cols={8} darkParity={1} rows={3} size={SCENE_SQUARE} x={SCENE_OFFSET} y={SCENE_OFFSET} />
      </g>
      {SCENE_PIECES.map(([color, row, col]) => (
        <Piece color={color} key={`${row}-${col}`} r={13} x={sceneCenter(col)} y={sceneCenter(row) - 1} />
      ))}
      <S.SceneArc
        d="M154 18C202 8 254 72 232 92"
        fill="none"
        stroke={GOLD}
        strokeDasharray="4 5"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <S.SceneDot cx={sceneCenter(5)} cy={sceneCenter(2)} fill={GOLD} r="6" />
      <S.SceneCaptured>
        <Piece color="ivory" r={13} x={sceneCenter(4)} y={sceneCenter(1) - 1} />
      </S.SceneCaptured>
      <S.SceneJumper>
        <Piece color="charcoal" r={13} x={sceneCenter(3)} y={sceneCenter(0) - 1} />
      </S.SceneJumper>
    </S.Scene>
  );
};

// A charcoal checker jumping an ivory one onto a gold dot: the capture that makes a rivalry
export const JumpTile = () => (
  <Tile>
    <Piece color="ivory" r={6.4} x={30} y={29} />
    <path d="M15 12.5C31 4 51 19 46.5 39" fill="none" stroke={GOLD} strokeDasharray="2.4 2.6" strokeWidth="1.8" />
    <circle cx="46" cy="46" fill={GOLD} r="3.2" />
    <Piece color="charcoal" r={6.4} x={14} y={13} />
  </Tile>
);

// A gold king under a crown, inside a round crest
export const KingCrest = () => (
  <S.Tile aria-hidden="true" viewBox="0 0 60 60">
    <circle cx="30" cy="30" fill={FRAME} r="29" stroke={GOLD} strokeOpacity="0.7" />
    <circle cx="30" cy="30" fill="none" r="24.5" stroke={GOLD} strokeDasharray="1.5 3" strokeOpacity="0.45" />
    <Piece color="gold" king r={11} x={30} y={38} />
    <path
      d={CROWN_PATH}
      fill={GOLD}
      stroke="#8f6416"
      strokeLinejoin="round"
      strokeWidth="1"
      transform="translate(30 17)"
    />
  </S.Tile>
);

// Two checkers, ivory for the player who moves first and charcoal for the other
export const Matchup = () => (
  <S.Matchup aria-hidden="true" viewBox="0 0 44 28">
    <Piece color="ivory" r={10} x={13} y={12} />
    <Piece color="charcoal" r={10} x={31} y={12} />
  </S.Matchup>
);

// An ivory checker with its two forward moves marked by gold dots, as on the match board
export const MoveTile = () => (
  <Tile>
    <circle cx="14" cy="14" fill={GOLD} r="3.2" />
    <circle cx="46" cy="14" fill={GOLD} r="3.2" />
    <Piece color="ivory" r={6.4} x={30} y={29} />
  </Tile>
);
