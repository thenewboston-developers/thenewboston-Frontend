import {useEffect, useRef} from 'react';

import {CasinoBet} from 'types/casino';

import * as S from './Styles';
import {
  ballPosition,
  CENTER,
  DROP_DURATION,
  isPlinkoResult,
  MULTIPLIERS,
  pathPoints,
  POCKET_WEIGHTS,
  POCKET_Y,
  pocketColor,
  ROW_HEIGHT,
  ROWS,
  SPACING,
  TOP,
} from './utils';

interface BoardProps {
  animate: boolean;
  bet: CasinoBet | null;
  dropping: boolean;
  onComplete(): void;
}

const PEGS = Array.from({length: ROWS}, (_, row) =>
  Array.from({length: row + 1}, (__, column) => ({
    x: CENTER + (column - row / 2) * SPACING,
    y: TOP + row * ROW_HEIGHT,
  })),
).flat();

const Board = ({animate, bet, dropping, onComplete}: BoardProps) => {
  const ball = useRef<SVGCircleElement>(null);
  const trail = useRef<SVGPolylineElement>(null);
  const validBet = isPlinkoResult(bet) ? bet : null;
  const points = validBet ? pathPoints(validBet.result.path) : null;
  const landing = points?.[points.length - 1] ?? {x: CENTER, y: TOP - 34};

  useEffect(() => {
    if (!dropping || !validBet) return undefined;
    if (!animate) {
      onComplete();
      return undefined;
    }
    const route = pathPoints(validBet.result.path);
    let frame: number;
    let started: number | null = null;
    const tick = (now: number) => {
      if (started === null) started = now;
      const progress = Math.min(1, (now - started) / DROP_DURATION);
      const position = ballPosition(route, progress);
      ball.current?.setAttribute('cx', String(position.x));
      ball.current?.setAttribute('cy', String(position.y));
      const passed = route.slice(0, Math.floor(progress * (route.length - 1)) + 1);
      trail.current?.setAttribute('points', [...passed, position].map(({x, y}) => `${x},${y}`).join(' '));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else onComplete();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, dropping, onComplete, validBet]);

  return (
    <S.Board aria-busy={dropping} aria-label="Plinko board">
      <svg aria-label="Twelve rows of pegs above thirteen payout pockets" role="img" viewBox="0 0 700 510">
        <defs>
          <radialGradient cx="30%" cy="25%" id="plinko-ball">
            <stop offset="0" stopColor="#fff8ce" />
            <stop offset="0.5" stopColor="#ffd77c" />
            <stop offset="1" stopColor="#f68b50" />
          </radialGradient>
          <radialGradient cx="35%" cy="25%" id="plinko-peg">
            <stop offset="0" stopColor="#ecfff9" />
            <stop offset="0.6" stopColor="#88c5c6" />
            <stop offset="1" stopColor="#3c727c" />
          </radialGradient>
          <filter height="220%" id="plinko-glow" width="220%" x="-60%" y="-60%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <path d="M324 20 V34 Q350 55 376 34 V20" fill="none" stroke="#57858b" strokeWidth="3" />
        <path d="M306 80 L26 430 M394 80 L674 430" fill="none" opacity="0.25" stroke="#6ce0c4" />
        {PEGS.map(({x, y}, index) => (
          <g key={index}>
            <circle cx={x} cy={y + 3} fill="#000" opacity="0.22" r="5.4" />
            <circle cx={x} cy={y} fill="url(#plinko-peg)" r="4" />
          </g>
        ))}
        <polyline
          fill="none"
          opacity="0.3"
          points={!dropping && points ? points.map(({x, y}) => `${x},${y}`).join(' ') : ''}
          ref={trail}
          stroke="#ffe1a0"
          strokeDasharray="2 6"
          strokeLinecap="round"
          strokeWidth="3"
        />
        {MULTIPLIERS.map((multiplier, slot) => {
          const x = CENTER + (slot - ROWS / 2) * SPACING;
          const selected = !dropping && validBet?.result.slot === slot;
          return (
            <g data-selected={selected || undefined} key={slot}>
              <title>{`Pocket ${slot + 1}: ${multiplier}× total return, ${((POCKET_WEIGHTS[slot] / 4096) * 100).toFixed(3)}% chance`}</title>
              {selected && (
                <rect
                  fill={pocketColor(multiplier)}
                  filter="url(#plinko-glow)"
                  height="40"
                  rx="7"
                  width="42"
                  x={x - 21}
                  y={POCKET_Y - 2}
                />
              )}
              <rect
                fill={pocketColor(multiplier)}
                height="34"
                rx="6"
                stroke={selected ? '#fff4d9' : 'transparent'}
                strokeWidth="2"
                width="40"
                x={x - 20}
                y={POCKET_Y}
              />
              <text
                fill={multiplier ? '#10272f' : '#b5cbd0'}
                fontSize="20"
                fontWeight="800"
                textAnchor="middle"
                x={x}
                y={POCKET_Y + 24}
              >
                {multiplier}×
              </text>
            </g>
          );
        })}
        <circle
          cx={dropping ? CENTER : landing.x}
          cy={dropping ? TOP - 34 : landing.y}
          fill="url(#plinko-ball)"
          r="7.5"
          ref={ball}
          stroke="#fff0bb"
          strokeWidth="1"
          style={{filter: 'drop-shadow(0 0 7px rgba(255, 197, 122, 0.6))'}}
        />
        <text fill="#7b9ea6" fontSize="11" letterSpacing="2" textAnchor="middle" x={CENTER} y="495">
          TOTAL RETURN · INCLUDES YOUR STAKE
        </text>
      </svg>
    </S.Board>
  );
};

export default Board;
