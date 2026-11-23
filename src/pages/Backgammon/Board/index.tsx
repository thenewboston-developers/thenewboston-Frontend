import {KeyboardEvent, useId, useLayoutEffect, useState} from 'react';

import {BackgammonBoard, BackgammonMove, BackgammonSide} from 'types/backgammon';

import {boardSignature, checkerPosition, reconcileCheckers} from './checkers';
import * as S from './Styles';

interface BoardProps {
  board: BackgammonBoard;
  decorative?: boolean;
  nextMoves?: BackgammonMove[];
  onSelect?: (point: number | 'bar' | 'off') => void;
  perspective?: BackgammonSide;
  selected?: number | 'bar' | null;
}

const Board = ({
  board,
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
          fill={selected === 'bar' && side === perspective ? '#e9c76a' : 'transparent'}
          fillOpacity={0.2}
          height={150}
          rx={12}
          stroke={canSelect ? '#e9c76a' : 'none'}
          strokeWidth={2}
          width={54}
          x={419}
          y={y - 75}
        />
        <text fill="#b8c9b9" fontSize={12} letterSpacing={2} textAnchor="middle" x={446} y={bottom ? 510 : 135}>
          BAR
        </text>
      </g>
    );
  };

  const renderChecker = (side: BackgammonSide) => (
    <>
      <ellipse cx={0} cy={4} fill="#082920" opacity="0.4" rx={25} ry={25} />
      <circle
        cx={0}
        cy={0}
        fill={`url(#${gradientId}-${side})`}
        r={24}
        stroke={side === 'white' ? '#d0c1a1' : '#122a27'}
        strokeWidth={2}
      />
      <circle cx={0} cy={0} fill="none" opacity="0.45" r={17} stroke={side === 'white' ? '#c1b494' : '#6c8b7d'} />
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
          fill={canSelect ? '#4d6650' : '#173f35'}
          height={240}
          rx={12}
          stroke={canSelect ? '#f8d57b' : '#476659'}
          strokeWidth={canSelect ? 3 : 1}
          width={83}
          x={887}
          y={y}
        />
        <text fill="#c2d1bf" fontSize={13} letterSpacing={2} textAnchor="middle" x={929} y={y + 28}>
          OFF
        </text>
        <circle cx={929} cy={y + 94} fill="none" r={24} stroke="#6a8471" strokeDasharray="3 5" />
        <text fill="#f3e8cb" fontSize={34} fontWeight={700} textAnchor="middle" x={929} y={y + 165}>
          {board.off[side]}
        </text>
        <text fill="#b8c9b9" fontSize={14} textAnchor="middle" x={929} y={y + 190}>
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
    const isSelected = selected === index;
    const isDestination = destinations.has(index);
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
          fill={index % 2 === 0 ? '#bb765b' : '#ddcdaa'}
          opacity={0.95}
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
        <text fill="#c0d0be" fontSize={15} fontWeight={600} textAnchor="middle" x={x + 29} y={top ? 31 : 618}>
          {index + 1}
        </text>
        {isDestination && <circle cx={x + 29} cy={top ? 303 : 337} fill="#f8d57b" r={9} />}
        {sources.has(index) && !isSelected && !!onSelect && (
          <circle cx={x + 29} cy={top ? 42 : 598} fill="#f8d57b" r={4} />
        )}
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
        <linearGradient id={`${gradientId}-white`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="100%" stopColor="#d9cfb0" />
        </linearGradient>
        <linearGradient id={`${gradientId}-black`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#48685b" />
          <stop offset="100%" stopColor="#102c27" />
        </linearGradient>
        <linearGradient id={`${gradientId}-felt`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#315c4c" />
          <stop offset="100%" stopColor="#204b3d" />
        </linearGradient>
      </defs>
      <rect fill="#163c32" height={640} rx={24} width={1000} />
      <rect
        fill={`url(#${gradientId}-felt)`}
        height={558}
        rx={12}
        stroke="#698372"
        strokeWidth={1}
        width={838}
        x={28}
        y={41}
      />
      <path d="M420 42 h52 v556 h-52Z" fill="#163c32" />
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
      <text fill="#9bb5a4" fontSize={11} letterSpacing={3} textAnchor="middle" x={225} y={325}>
        THENEWBOSTON
      </text>
      <text fill="#9bb5a4" fontSize={11} letterSpacing={3} textAnchor="middle" x={673} y={325}>
        BACKGAMMON
      </text>
      {renderCheckers()}
    </S.Canvas>
  );
};

export default Board;
