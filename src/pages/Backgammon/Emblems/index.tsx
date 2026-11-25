import {ReactNode, useId} from 'react';

import {BackgammonBoard, BackgammonSide} from 'types/backgammon';

import {checkerPosition} from '../Board/checkers';
import {backgammon} from '../theme';

import * as S from './Styles';

// Cells of a three by three grid, read left to right and top to bottom
const PIP_CELLS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const COLUMNS = Array.from({length: 12}, (_, column) => column);
const SIDES: BackgammonSide[] = ['white', 'black'];

// Mid-game position for the hit: black has a 4 to play from point 17 onto the lone white checker on point 21. The
// checker that moves and the one that is hit are drawn separately so they can be animated.
const HIT_BOARD: BackgammonBoard = {
  bar: {black: 0, white: 0},
  off: {black: 0, white: 0},
  points: [-2, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, -5, 5, 0, 0, 0, -2, 0, -5, 0, 0, 0, 0, 1],
};

const pointX = (column: number) => 36 + column * 64 + (column >= 6 ? 52 : 0);

export const Die = ({className, value}: {className?: string; value: number}) => (
  <S.Die aria-hidden="true" className={className}>
    {Array.from({length: 9}, (_, cell) => (
      <S.Pip $visible={PIP_CELLS[value]?.includes(cell) ?? false} key={cell} />
    ))}
  </S.Die>
);

export const DicePair = ({className, values}: {className?: string; values: [number, number]}) => (
  <S.DicePair aria-hidden="true" className={className}>
    <Die value={values[0]} />
    <Die value={values[1]} />
  </S.DicePair>
);

// The cube drawn in an 88 by 88 box, shared by the stand-alone cube and the result artwork
const CubeFaces = ({value}: {value: number}) => (
  <>
    <ellipse cx="41" cy="81" fill="#00000052" rx="31" ry="5" />
    <path d="M14 30 28 16h46L60 30Z" fill="#fbf5e4" stroke="#a8946a" strokeLinejoin="round" />
    <path d="M60 30 74 16v46L60 76Z" fill="#cdbb92" stroke="#a8946a" strokeLinejoin="round" />
    <rect fill="#efe3c6" height="46" rx="3" stroke="#a8946a" width="46" x="14" y="30" />
    <text
      fill="#173b31"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize={value > 9 ? 23 : 28}
      fontWeight="700"
      textAnchor="middle"
      x="37"
      y={value > 9 ? 61 : 63}
    >
      {value}
    </text>
  </>
);

export const DoublingCube = ({className, value}: {className?: string; value: number}) => (
  <S.Cube aria-hidden="true" className={className} focusable="false" viewBox="0 0 88 88">
    <CubeFaces value={value} />
  </S.Cube>
);

// A point from the bottom row of the board with checkers stacked on it
export const PointStack = ({className, count}: {className?: string; count: number}) => (
  <S.PointStack aria-hidden="true" className={className} focusable="false" viewBox="0 0 30 60">
    <path d="M1 60h28L15 2Z" fill={backgammon.coral} />
    {Array.from({length: count}, (_, index) => (
      <g key={index} transform={`translate(15 ${52.5 - index * 10.6})`}>
        <circle fill="#f4ead4" r="6.6" stroke="#8f7c55" />
        <circle fill="none" r="4" stroke="#b9a77d" strokeWidth="0.8" />
      </g>
    ))}
  </S.PointStack>
);

export const RollingDice = ({className}: {className?: string}) => (
  <S.RollingDice aria-hidden="true" className={className}>
    <Die value={5} />
    <Die value={2} />
  </S.RollingDice>
);

interface MiniBoardProps {
  board: BackgammonBoard;
  children?: (renderChecker: (side: BackgammonSide) => ReactNode) => ReactNode;
  className?: string;
  dice?: number[];
}

/**
 * A small, decorative copy of a position on the match board, using the board's own geometry so checkers sit where
 * players will find them. White's home board is at the bottom right.
 */
export const MiniBoard = ({board, children, className, dice = []}: MiniBoardProps) => {
  const id = useId().replace(/:/g, '');

  const renderChecker = (side: BackgammonSide) => (
    <>
      <circle cy={4} fill="#021a17" opacity={0.45} r={25} />
      <circle fill={`url(#${id}-${side})`} r={24} stroke={side === 'white' ? '#bfae86' : '#0c231f'} strokeWidth={2} />
      <circle fill="none" opacity={0.55} r={16} stroke={side === 'white' ? '#bcae8a' : '#6f8f80'} strokeWidth={2} />
    </>
  );

  const renderDie = (value: number, index: number) => {
    const x = 600 + index * 80;
    return (
      <g data-die={index} key={index}>
        <g transform={`rotate(${index ? 7 : -8} ${x + 29} 320)`}>
          <rect fill="#f8f0dd" height={58} rx={11} stroke="#bfae86" strokeWidth={2} width={58} x={x} y={291} />
          {(PIP_CELLS[value] ?? []).map((cell) => (
            <circle
              cx={x + 13 + (cell % 3) * 16}
              cy={304 + Math.floor(cell / 3) * 16}
              fill="#18221f"
              key={cell}
              r={6}
            />
          ))}
        </g>
      </g>
    );
  };

  const renderTray = (side: BackgammonSide) => {
    const top = side === 'black';
    return (
      <g key={side}>
        <rect
          fill="#032824"
          height={240}
          rx={12}
          stroke={backgammon.brass}
          strokeOpacity={0.45}
          strokeWidth={2}
          width={83}
          x={887}
          y={top ? 52 : 348}
        />
        {Array.from({length: Math.min(board.off[side], 15)}, (_, index) => (
          <rect
            fill={side === 'white' ? '#ece1c6' : backgammon.forest}
            height={11}
            key={index}
            rx={5}
            stroke={side === 'white' ? '#bfae86' : '#5f8071'}
            width={67}
            x={895}
            y={top ? 60 + index * 14.6 : 569 - index * 14.6}
          />
        ))}
      </g>
    );
  };

  return (
    <S.MiniBoard aria-hidden="true" className={className} focusable="false" viewBox="0 0 1000 640">
      <defs>
        <linearGradient id={`${id}-walnut`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={backgammon.walnutLight} />
          <stop offset="0.45" stopColor={backgammon.walnut} />
          <stop offset="1" stopColor={backgammon.walnutDeep} />
        </linearGradient>
        <linearGradient id={`${id}-felt`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0b4f45" />
          <stop offset="1" stopColor={backgammon.feltDeep} />
        </linearGradient>
        <radialGradient cx="0.34" cy="0.28" id={`${id}-white`} r="0.8">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="0.55" stopColor="#ebe0c5" />
          <stop offset="1" stopColor="#cdbf9c" />
        </radialGradient>
        <radialGradient cx="0.34" cy="0.28" id={`${id}-black`} r="0.8">
          <stop offset="0" stopColor="#5f8071" />
          <stop offset="0.55" stopColor={backgammon.forest} />
          <stop offset="1" stopColor="#102c27" />
        </radialGradient>
      </defs>
      <rect fill={`url(#${id}-walnut)`} height={640} rx={30} width={1000} />
      <rect
        fill={`url(#${id}-felt)`}
        height={558}
        rx={10}
        stroke={backgammon.brass}
        strokeOpacity={0.7}
        strokeWidth={3}
        width={838}
        x={28}
        y={41}
      />
      <rect fill={`url(#${id}-walnut)`} height={562} width={52} x={420} y={39} />
      <rect fill={backgammon.brass} height={46} rx={4} width={14} x={439} y={118} />
      <rect fill={backgammon.brass} height={46} rx={4} width={14} x={439} y={476} />
      {COLUMNS.map((column) => {
        const x = pointX(column);
        return (
          <g key={column}>
            <path d={`M${x} 52h58L${x + 29} 286Z`} fill={column % 2 === 0 ? backgammon.coral : backgammon.ivory} />
            <path d={`M${x} 588h58L${x + 29} 354Z`} fill={column % 2 === 0 ? backgammon.ivory : backgammon.coral} />
          </g>
        );
      })}
      {SIDES.map(renderTray)}
      {board.points.map((value, location) => {
        const side: BackgammonSide = value > 0 ? 'white' : 'black';
        return Array.from({length: Math.min(Math.abs(value), 5)}, (_, slot) => {
          const {x, y} = checkerPosition(side, location, slot, 'white');
          return (
            <g key={`${location}-${slot}`} transform={`translate(${x} ${y})`}>
              {renderChecker(side)}
            </g>
          );
        });
      })}
      {SIDES.filter((side) => board.bar[side] > 0).map((side) => {
        const {x, y} = checkerPosition(side, 'bar', 0, 'white');
        return (
          <g key={`bar-${side}`} transform={`translate(${x} ${y})`}>
            {renderChecker(side)}
          </g>
        );
      })}
      {dice.slice(0, 2).map(renderDie)}
      {children?.(renderChecker)}
    </S.MiniBoard>
  );
};

// Bottom to top, so each checker sits on the one below it
const RESULT_STACK = Array.from({length: 7}, (_, index) => 150 - index * 11);

const STACK_COLORS: Record<BackgammonSide, {edge: string; ring: string; side: string[]; top: string[]}> = {
  black: {
    edge: '#06130f',
    ring: '#6f8f80',
    side: ['#0b1f1b', '#3d6155', '#1f3d35', '#08160f'],
    top: ['#5f8071', backgammon.forest, '#163731'],
  },
  white: {
    edge: '#8f7c55',
    ring: '#bcae8a',
    side: ['#a38f63', '#f3ead4', '#cdbf9c', '#9a8558'],
    top: ['#fffaf0', '#ebe0c5', '#d8caa6'],
  },
};

const SPARKLES = [
  {scale: 1, x: 36, y: 46},
  {scale: 0.7, x: 238, y: 34},
  {scale: 0.55, x: 252, y: 118},
];

interface ResultArtworkProps {
  celebrate?: boolean;
  cube: number;
  winner: BackgammonSide | null;
}

/** The end of a match: the winner's checkers stacked up after bearing off, with the cube and a die beside them. */
export const ResultArtwork = ({celebrate = false, cube, winner}: ResultArtworkProps) => {
  const id = useId().replace(/:/g, '');
  const colors = winner ? STACK_COLORS[winner] : null;

  return (
    <S.ResultArtwork aria-hidden="true" focusable="false" viewBox="0 0 270 190">
      {colors && (
        <defs>
          <linearGradient id={`${id}-side`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={colors.side[0]} />
            <stop offset="0.35" stopColor={colors.side[1]} />
            <stop offset="0.7" stopColor={colors.side[2]} />
            <stop offset="1" stopColor={colors.side[3]} />
          </linearGradient>
          <radialGradient cx="0.38" cy="0.3" id={`${id}-top`} r="0.8">
            <stop offset="0" stopColor={colors.top[0]} />
            <stop offset="0.55" stopColor={colors.top[1]} />
            <stop offset="1" stopColor={colors.top[2]} />
          </radialGradient>
        </defs>
      )}
      <ellipse cx="134" cy="168" fill="#00000052" rx="118" ry="13" />
      {colors &&
        RESULT_STACK.map((y) => (
          <g key={y}>
            <path
              d={`M46 ${y}v11a50 17 0 0 0 100 0v-11Z`}
              fill={`url(#${id}-side)`}
              stroke={colors.edge}
              strokeOpacity={0.55}
            />
            <ellipse cx="96" cy={y} fill={`url(#${id}-top)`} rx="50" ry="17" />
          </g>
        ))}
      {colors && (
        <ellipse
          cx="96"
          cy={RESULT_STACK[RESULT_STACK.length - 1]}
          fill="none"
          opacity={0.6}
          rx="33"
          ry="11"
          stroke={colors.ring}
          strokeWidth="2"
        />
      )}
      <g transform="translate(142 62) scale(1.15) rotate(7 44 46)">
        <CubeFaces value={cube} />
      </g>
      <g transform="translate(238 157) rotate(-14)">
        <rect fill="#f8f0dd" height="34" rx="7" stroke="#bfae86" strokeWidth="1.5" width="34" x="-17" y="-17" />
        {PIP_CELLS[6].map((cell) => (
          <circle cx={-9 + (cell % 3) * 9} cy={-9 + Math.floor(cell / 3) * 9} fill="#18221f" key={cell} r="3.2" />
        ))}
      </g>
      {celebrate &&
        SPARKLES.map(({scale, x, y}) => (
          <path
            className="result-sparkle"
            d="M0-9 2.2-2.2 9 0 2.2 2.2 0 9-2.2 2.2-9 0-2.2-2.2Z"
            fill={backgammon.brassBright}
            key={x}
            transform={`translate(${x} ${y}) scale(${scale})`}
          />
        ))}
    </S.ResultArtwork>
  );
};

// Shown to signed-out visitors: a 4 lands on a lone checker and sends it to the bar
export const HitScene = ({className}: {className?: string}) => (
  <S.Scene className={className}>
    <MiniBoard board={HIT_BOARD} dice={[4, 2]}>
      {(renderChecker) => (
        <>
          <S.Blot>{renderChecker('white')}</S.Blot>
          <S.Hitter>{renderChecker('black')}</S.Hitter>
        </>
      )}
    </MiniBoard>
    <S.SceneCaption>Roll a 4, hit the blot, and send it to the bar.</S.SceneCaption>
  </S.Scene>
);
