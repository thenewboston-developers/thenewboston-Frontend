import {KeyboardEvent, useId, useLayoutEffect, useState} from 'react';

import {BackgammonBoard, BackgammonMove, BackgammonSide} from 'types/backgammon';

import {backgammon, FELT_GRAIN_IMAGE, WOOD_GRAIN_IMAGE} from '../theme';

import {boardSignature, checkerPosition, reconcileCheckers} from './checkers';
import * as S from './Styles';

export interface BoardCube {
  // Crawford game: nobody may double
  disabled?: boolean;
  // A double is waiting for an answer, so the cube shows the value on offer
  offered?: boolean;
  owner: BackgammonSide | null;
  value: number;
}

interface BoardProps {
  board: BackgammonBoard;
  cube?: BoardCube;
  decorative?: boolean;
  nextMoves?: BackgammonMove[];
  onSelect?: (point: number | 'bar' | 'off') => void;
  perspective?: BackgammonSide;
  selected?: number | 'bar' | null;
}

// The two halves of the playing surface on either side of the bar, which is the walnut frame showing through
const FELT_HALVES = [
  {width: 392, x: 28},
  {width: 394, x: 472},
];

const Board = ({
  board,
  cube,
  decorative = false,
  nextMoves = [],
  onSelect,
  perspective = 'white',
  selected = null,
}: BoardProps) => {
  const [layout, setLayout] = useState(() => ({
    animate: false,
    checkers: reconcileCheckers([], board, perspective),
    perspective,
    signature: boardSignature(board),
  }));
  const destinations = new Set(nextMoves.filter((move) => move.from === selected).map((move) => move.to));
  const gradientId = useId().replace(/:/g, '');
  const opponent = perspective === 'white' ? 'black' : 'white';
  const signature = boardSignature(board);
  const sources = new Set(nextMoves.map((move) => move.from));

  useLayoutEffect(() => {
    setLayout((previous) => {
      if (previous.signature === signature && previous.perspective === perspective) return previous;
      return {
        animate: !decorative && previous.perspective === perspective,
        checkers: reconcileCheckers(previous.checkers, board, perspective),
        perspective,
        signature,
      };
    });
  }, [board, decorative, perspective, signature]);

  const handleKey = (event: KeyboardEvent<SVGGElement>, point: number | 'bar' | 'off') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.(point);
    }
  };

  const renderBar = (side: BackgammonSide, bottom: boolean) => {
    const canSelect = !!onSelect && side === perspective && sources.has('bar');
    const count = board.bar[side];
    const y = bottom ? 413 : 227;
    const plateY = bottom ? 506 : 131;
    return (
      <g
        aria-label={decorative ? undefined : `${side} bar: ${count} checkers`}
        aria-pressed={canSelect ? selected === 'bar' : undefined}
        key={`bar-${side}`}
        onClick={canSelect ? () => onSelect?.('bar') : undefined}
        onKeyDown={canSelect ? (event) => handleKey(event, 'bar') : undefined}
        role={canSelect ? 'button' : undefined}
        tabIndex={canSelect ? 0 : undefined}
      >
        <rect
          className="point-focus"
          fill={selected === 'bar' && side === perspective ? '#f8d57b' : 'transparent'}
          fillOpacity={0.22}
          height={150}
          rx={12}
          stroke={canSelect ? '#f8d57b' : 'none'}
          strokeWidth={2}
          width={54}
          x={419}
          y={y - 75}
        />
        <rect
          fill={`url(#${gradientId}-brass)`}
          height={22}
          rx={3}
          stroke={backgammon.brassDeep}
          width={40}
          x={426}
          y={plateY - 11}
        />
        <text
          fill="#3a2410"
          fontSize={11}
          fontWeight={700}
          letterSpacing={1.5}
          textAnchor="middle"
          x={447}
          y={plateY + 4}
        >
          BAR
        </text>
      </g>
    );
  };

  const renderChecker = (side: BackgammonSide) => (
    <>
      <circle cx={0} cy={4} fill="#021a17" opacity={0.45} r={25} />
      <circle
        cx={0}
        cy={0}
        fill={`url(#${gradientId}-${side})`}
        r={24}
        stroke={side === 'white' ? '#bfae86' : '#0c231f'}
        strokeWidth={2}
      />
      <circle
        cx={0}
        cy={0}
        fill="none"
        opacity={0.55}
        r={16}
        stroke={side === 'white' ? '#bcae8a' : '#6f8f80'}
        strokeWidth={2}
      />
    </>
  );

  const renderCheckers = () => (
    <g aria-hidden="true" pointerEvents="none">
      {layout.checkers.map((checker) => (
        <S.CheckerPiece
          $animate={layout.animate && !decorative}
          data-checker-id={checker.id}
          data-checker-location={checker.location}
          data-checker-side={checker.side}
          key={checker.id}
          style={{transform: `translate(${checker.x}px, ${checker.y}px)`}}
        >
          {renderChecker(checker.side)}
        </S.CheckerPiece>
      ))}
      {board.points.map((value, location) => {
        if (Math.abs(value) <= 5) return null;
        const side = value > 0 ? 'white' : 'black';
        const {x, y} = checkerPosition(side, location, 4, perspective);
        return renderCount(side, x, y, Math.abs(value), `point-count-${location}`);
      })}
      {(['white', 'black'] as BackgammonSide[]).map((side) => {
        if (board.bar[side] <= 1) return null;
        const {x, y} = checkerPosition(side, 'bar', 0, perspective);
        return renderCount(side, x, y, board.bar[side], `bar-count-${side}`);
      })}
    </g>
  );

  const renderCount = (side: BackgammonSide, x: number, y: number, count: number, key: string) => (
    <text
      dominantBaseline="middle"
      fill={side === 'white' ? '#3c443c' : '#f5ead0'}
      fontSize={18}
      fontWeight={700}
      key={key}
      textAnchor="middle"
      x={x}
      y={y + 1}
    >
      {count}
    </text>
  );

  // The cube waits on the middle of the bar and moves to the end of the bar nearest the player who owns it
  const renderCube = () => {
    if (!cube) return null;
    let y = 320;
    if (cube.owner) y = cube.owner === perspective ? 556 : 84;
    let value = cube.offered ? cube.value * 2 : cube.value;
    // A real cube has no face for 1, so a centered cube shows 64
    if (value === 1 && !cube.owner) value = 64;
    return (
      <S.BoardCube
        $animate={!decorative}
        $disabled={!!cube.disabled}
        $offered={!!cube.offered}
        aria-hidden="true"
        data-cube-owner={cube.owner ?? 'center'}
        data-cube-value={value}
        style={{transform: `translate(446px, ${y}px)`}}
      >
        <rect
          className="cube-offer"
          fill="none"
          height={52}
          rx={12}
          stroke="#f8d57b"
          strokeWidth={3}
          width={52}
          x={-26}
          y={-26}
        />
        <rect fill="#140b05" height={40} opacity={0.5} rx={8} width={40} x={-18} y={-16} />
        <rect
          fill={`url(#${gradientId}-cube)`}
          height={40}
          rx={8}
          stroke="#a8946a"
          strokeWidth={2}
          width={40}
          x={-20}
          y={-20}
        />
        <text
          className="serif"
          dominantBaseline="central"
          fill="#173b31"
          fontSize={value > 9 ? 19 : 24}
          fontWeight={700}
          textAnchor="middle"
          x={0}
          y={1}
        >
          {value}
        </text>
      </S.BoardCube>
    );
  };

  // A ring where the checker will land. It is drawn above the checkers, so a blot about to be hit still shows it, and
  // away from the middle of the board, where the dice are rolled.
  const renderDestinations = () => (
    <g aria-hidden="true" pointerEvents="none">
      {Array.from(destinations).map((point) => {
        if (point === 'off') return null;
        const value = board.points[point];
        const own = perspective === 'white' ? value : -value;
        const {x, y} = checkerPosition(perspective, point, Math.max(0, Math.min(own, 4)), perspective);
        return (
          <circle
            cx={x}
            cy={y}
            data-destination={point}
            fill="#f8d57b"
            fillOpacity={0.18}
            key={point}
            r={23}
            stroke="#f8d57b"
            strokeDasharray="7 5"
            strokeWidth={3}
          />
        );
      })}
    </g>
  );

  const renderOff = (side: BackgammonSide, bottom: boolean) => {
    const canSelect = !!onSelect && side === perspective && destinations.has('off');
    const y = bottom ? 348 : 52;
    return (
      <g
        aria-label={
          decorative ? undefined : `${side} borne off: ${board.off[side]} of 15${canSelect ? ', bear off here' : ''}`
        }
        key={`off-${side}`}
        onClick={canSelect ? () => onSelect?.('off') : undefined}
        onKeyDown={canSelect ? (event) => handleKey(event, 'off') : undefined}
        role={canSelect ? 'button' : undefined}
        tabIndex={canSelect ? 0 : undefined}
      >
        <rect
          className="point-focus"
          fill={canSelect ? '#0f5a4e' : '#032a25'}
          height={240}
          rx={12}
          stroke={canSelect ? '#f8d57b' : backgammon.brass}
          strokeOpacity={canSelect ? 1 : 0.55}
          strokeWidth={canSelect ? 3 : 2}
          width={83}
          x={887}
          y={y}
        />
        <rect fill={`url(#${gradientId}-grain)`} height={240} pointerEvents="none" rx={12} width={83} x={887} y={y} />
        <text
          fill={backgammon.brassText}
          fontSize={12}
          fontWeight={700}
          letterSpacing={3}
          textAnchor="middle"
          x={930}
          y={y + 28}
        >
          OFF
        </text>
        <circle
          cx={929}
          cy={y + 94}
          fill="#00000033"
          r={25}
          stroke={backgammon.brass}
          strokeDasharray="3 5"
          strokeOpacity={0.7}
        />
        <text fill={backgammon.ink} fontSize={34} fontWeight={700} textAnchor="middle" x={929} y={y + 166}>
          {board.off[side]}
        </text>
        <text fill={backgammon.mist} fontSize={13} letterSpacing={1} textAnchor="middle" x={929} y={y + 192}>
          of 15
        </text>
      </g>
    );
  };

  const renderPoint = (index: number, column: number, top: boolean) => {
    const x = 36 + column * 64 + (column >= 6 ? 52 : 0);
    const value = board.points[index];
    const count = Math.abs(value);
    const side = value > 0 ? 'white' : 'black';
    const canSelect = !!onSelect && (sources.has(index) || destinations.has(index));
    const color = index % 2 === 0 ? 'coral' : 'ivory';
    const isSelected = selected === index;
    const isDestination = destinations.has(index);
    const isSource = sources.has(index) && !!onSelect;
    const accessibleLabel = `Point ${index + 1}: ${count ? `${count} ${side} checker${count === 1 ? '' : 's'}` : 'empty'}${isDestination ? ', move here' : ''}`;

    return (
      <g
        aria-label={decorative ? undefined : accessibleLabel}
        aria-pressed={canSelect ? isSelected : undefined}
        key={index}
        onClick={canSelect ? () => onSelect?.(index) : undefined}
        onKeyDown={canSelect ? (event) => handleKey(event, index) : undefined}
        role={canSelect ? 'button' : undefined}
        tabIndex={canSelect ? 0 : undefined}
      >
        <path
          d={top ? `M${x},52 h58 L${x + 29},286 Z` : `M${x},588 h58 L${x + 29},354 Z`}
          fill={`url(#${gradientId}-${color}-${top ? 'down' : 'up'})`}
          stroke={color === 'coral' ? '#7f4734' : '#9f8d65'}
          strokeOpacity={0.55}
        />
        <rect
          className="point-focus"
          fill={isSelected ? '#f8d57b' : 'transparent'}
          fillOpacity={0.22}
          height={242}
          rx={8}
          stroke={isSelected ? '#f8d57b' : 'none'}
          strokeWidth={3}
          width={60}
          x={x - 1}
          y={top ? 50 : 348}
        />
        <text
          fill={isSource ? '#ffe3a2' : backgammon.brassText}
          fontSize={15}
          fontWeight={isSource ? 800 : 600}
          textAnchor="middle"
          x={x + 29}
          y={top ? 31 : 620}
        >
          {index + 1}
        </text>
        {isSource && !isSelected && <circle cx={x + 29} cy={top ? 46.5 : 593.5} fill="#f8d57b" r={3.5} />}
      </g>
    );
  };

  return (
    <S.Canvas
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `Backgammon board, ${perspective} perspective`}
      role={decorative ? undefined : 'group'}
      viewBox="0 0 1000 640"
    >
      <defs>
        <linearGradient id={`${gradientId}-walnut`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={backgammon.walnutLight} />
          <stop offset="0.45" stopColor={backgammon.walnut} />
          <stop offset="1" stopColor={backgammon.walnutDeep} />
        </linearGradient>
        <pattern height={160} id={`${gradientId}-wood`} patternUnits="userSpaceOnUse" width={720}>
          <image height={160} href={WOOD_GRAIN_IMAGE} width={720} />
        </pattern>
        <linearGradient id={`${gradientId}-felt`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0f5a4e" />
          <stop offset="1" stopColor="#084239" />
        </linearGradient>
        <radialGradient cx={760} cy={20} gradientUnits="userSpaceOnUse" id={`${gradientId}-sheen`} r={640}>
          <stop offset="0" stopColor={backgammon.feltLight} stopOpacity={0.7} />
          <stop offset="1" stopColor={backgammon.feltLight} stopOpacity={0} />
        </radialGradient>
        <pattern height={160} id={`${gradientId}-grain`} patternUnits="userSpaceOnUse" width={160}>
          <image height={160} href={FELT_GRAIN_IMAGE} width={160} />
        </pattern>
        <linearGradient id={`${gradientId}-brass`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={backgammon.brassBright} />
          <stop offset="0.55" stopColor={backgammon.brass} />
          <stop offset="1" stopColor={backgammon.brassDeep} />
        </linearGradient>
        <linearGradient id={`${gradientId}-coral-down`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c8836a" />
          <stop offset="1" stopColor="#a5624a" />
        </linearGradient>
        <linearGradient id={`${gradientId}-coral-up`} x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#c8836a" />
          <stop offset="1" stopColor="#a5624a" />
        </linearGradient>
        <linearGradient id={`${gradientId}-ivory-down`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e8dabb" />
          <stop offset="1" stopColor="#cbb991" />
        </linearGradient>
        <linearGradient id={`${gradientId}-ivory-up`} x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#e8dabb" />
          <stop offset="1" stopColor="#cbb991" />
        </linearGradient>
        <radialGradient cx="0.34" cy="0.28" id={`${gradientId}-white`} r="0.8">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="0.55" stopColor="#ebe0c5" />
          <stop offset="1" stopColor="#cdbf9c" />
        </radialGradient>
        <radialGradient cx="0.34" cy="0.28" id={`${gradientId}-black`} r="0.8">
          <stop offset="0" stopColor="#5f8071" />
          <stop offset="0.55" stopColor={backgammon.forest} />
          <stop offset="1" stopColor="#102c27" />
        </radialGradient>
        <linearGradient id={`${gradientId}-cube`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#e2d4b0" />
        </linearGradient>
      </defs>
      <rect fill={`url(#${gradientId}-walnut)`} height={640} rx={24} width={1000} />
      <rect fill={`url(#${gradientId}-wood)`} height={640} rx={24} width={1000} />
      <rect
        fill="none"
        height={638}
        rx={23}
        stroke="#ffffff"
        strokeOpacity={0.09}
        strokeWidth={2}
        width={998}
        x={1}
        y={1}
      />
      {FELT_HALVES.map(({width, x}) => (
        <g key={x}>
          <rect fill="#0d0603" fillOpacity={0.55} height={564} rx={13} width={width + 6} x={x - 3} y={38} />
          <rect fill={`url(#${gradientId}-felt)`} height={558} rx={10} width={width} x={x} y={41} />
          <rect fill={`url(#${gradientId}-sheen)`} height={558} rx={10} width={width} x={x} y={41} />
          <rect fill={`url(#${gradientId}-grain)`} height={558} rx={10} width={width} x={x} y={41} />
          <rect
            fill="none"
            height={558}
            rx={10}
            stroke={backgammon.brass}
            strokeOpacity={0.75}
            strokeWidth={3}
            width={width}
            x={x}
            y={41}
          />
        </g>
      ))}
      <path d="M446 41v558" stroke="#0d0603" strokeOpacity={0.45} strokeWidth={2} />
      {Array.from({length: 12}, (_, column) =>
        renderPoint(perspective === 'white' ? 12 + column : 11 - column, column, true),
      )}
      {Array.from({length: 12}, (_, column) =>
        renderPoint(perspective === 'white' ? 11 - column : 12 + column, column, false),
      )}
      {renderBar(opponent, false)}
      {renderBar(perspective, true)}
      {renderOff(opponent, false)}
      {renderOff(perspective, true)}
      {renderCube()}
      {renderCheckers()}
      {renderDestinations()}
    </S.Canvas>
  );
};

export default Board;
