import {mdiStar} from '@mdi/js';

import {SFC} from 'types';

import * as S from './Styles';

interface BoardProps {
  bombBlastKeys: Set<string>;
  bombBlastPieces: Record<string, 'black' | 'white'>;
  bombBlastSequence: number;
  boardState: number[][];
  isSpectator: boolean;
  lastMoveKeys: Set<string>;
  lastMoveSequence: number;
  onCellClick: (x: number, y: number) => void;
  onCellHover: (x: number, y: number) => void;
  onCellLeave: () => void;
  previewKeys: Set<string>;
  previewState: {cells: Array<{x: number; y: number}>; isValid: boolean};
  previewVariant: 'black' | 'white';
  winningKeys: Set<string>;
}

const BOMB_SHARD_CONFIG = [
  {delay: 0.01, offsetX: -55, offsetY: -50, size: 8},
  {delay: 0.03, offsetX: 60, offsetY: -35, size: 7},
  {delay: 0.05, offsetX: -65, offsetY: 20, size: 9},
  {delay: 0.02, offsetX: 50, offsetY: 55, size: 6},
  {delay: 0.04, offsetX: -25, offsetY: 65, size: 7},
  {delay: 0.06, offsetX: 70, offsetY: 10, size: 8},
  {delay: 0.03, offsetX: -10, offsetY: -60, size: 6},
  {delay: 0.05, offsetX: 35, offsetY: -55, size: 5},
];

const BOMB_FRAGMENT_CONFIG = [
  // Large pieces - main shards
  {delay: 0.0, offsetX: -70, offsetY: -45, rotation: -35, size: 14},
  {delay: 0.01, offsetX: 65, offsetY: -55, rotation: 40, size: 13},
  {delay: 0.02, offsetX: -60, offsetY: 50, rotation: -50, size: 12},
  {delay: 0.01, offsetX: 70, offsetY: 40, rotation: 55, size: 14},
  {delay: 0.02, offsetX: -15, offsetY: -75, rotation: 15, size: 11},
  {delay: 0.03, offsetX: 20, offsetY: 70, rotation: -25, size: 12},
  // Medium pieces - secondary shards
  {delay: 0.03, offsetX: -80, offsetY: -10, rotation: -70, size: 10},
  {delay: 0.04, offsetX: 85, offsetY: -15, rotation: 65, size: 9},
  {delay: 0.04, offsetX: -45, offsetY: -65, rotation: -20, size: 9},
  {delay: 0.05, offsetX: 50, offsetY: 60, rotation: 30, size: 10},
  {delay: 0.05, offsetX: -55, offsetY: 65, rotation: -45, size: 8},
  {delay: 0.06, offsetX: 40, offsetY: -70, rotation: 50, size: 9},
  // Small pieces - debris
  {delay: 0.04, offsetX: -90, offsetY: 25, rotation: -80, size: 7},
  {delay: 0.05, offsetX: 80, offsetY: 50, rotation: 75, size: 6},
  {delay: 0.06, offsetX: -35, offsetY: 80, rotation: -35, size: 7},
  {delay: 0.07, offsetX: 25, offsetY: -80, rotation: 45, size: 6},
  {delay: 0.06, offsetX: -75, offsetY: -40, rotation: -60, size: 6},
  {delay: 0.07, offsetX: 90, offsetY: -30, rotation: 85, size: 5},
  // Tiny pieces - particles
  {delay: 0.05, offsetX: -100, offsetY: 0, rotation: -90, size: 5},
  {delay: 0.06, offsetX: 95, offsetY: 20, rotation: 70, size: 4},
  {delay: 0.07, offsetX: 0, offsetY: -90, rotation: 0, size: 5},
  {delay: 0.08, offsetX: 5, offsetY: 95, rotation: 10, size: 4},
];

const Board: SFC<BoardProps> = ({
  bombBlastKeys,
  bombBlastPieces,
  bombBlastSequence,
  boardState,
  className,
  isSpectator,
  lastMoveKeys,
  lastMoveSequence,
  onCellClick,
  onCellHover,
  onCellLeave,
  previewKeys,
  previewState,
  previewVariant,
  winningKeys,
}) => {
  return (
    <S.Board className={className}>
      {boardState.map((row, y) =>
        row.map((value, x) => {
          const cellKey = `${x}-${y}`;
          const isBombBlast = bombBlastKeys.has(cellKey);
          const isPreview = previewKeys.has(cellKey);
          const isInvalid = isPreview && !previewState.isValid;
          const isLastMove = lastMoveKeys.has(cellKey);
          const isWinningCell = winningKeys.has(cellKey);
          const bombPieceVariant = bombBlastPieces[cellKey];
          const pieceVariant = value === 1 ? 'black' : 'white';
          const shouldEnableClick = !isSpectator && previewState.isValid && isPreview;

          return (
            <S.Cell
              $isPreview={isPreview}
              $isPreviewInvalid={isInvalid}
              key={cellKey}
              onClick={() => {
                if (!shouldEnableClick) return;
                onCellClick(x, y);
              }}
              onMouseEnter={() => onCellHover(x, y)}
              onMouseLeave={onCellLeave}
              type="button"
            >
              {isLastMove && value !== 0 && (
                <S.ImpactRing $variant={pieceVariant} key={`impact-${lastMoveSequence}-${cellKey}`} />
              )}
              {isBombBlast && (
                <S.BombBlast aria-hidden key={`bomb-${bombBlastSequence}-${cellKey}`}>
                  <S.BombFlash />
                  <S.BombRing />
                  <S.BombSmoke />
                  {bombPieceVariant &&
                    BOMB_FRAGMENT_CONFIG.map((fragment, index) => (
                      <S.BombFragment
                        $delay={fragment.delay}
                        $offsetX={fragment.offsetX}
                        $offsetY={fragment.offsetY}
                        $rotation={fragment.rotation}
                        $size={fragment.size}
                        $variant={bombPieceVariant}
                        key={`bomb-fragment-${bombBlastSequence}-${cellKey}-${index}`}
                      />
                    ))}
                  {BOMB_SHARD_CONFIG.map((shard, index) => (
                    <S.BombShard
                      $delay={shard.delay}
                      $offsetX={shard.offsetX}
                      $offsetY={shard.offsetY}
                      $size={shard.size}
                      key={`bomb-shard-${bombBlastSequence}-${cellKey}-${index}`}
                    />
                  ))}
                  {bombPieceVariant && <S.BombBlastPiece $variant={bombPieceVariant} />}
                </S.BombBlast>
              )}
              {value === 1 && <S.Piece $isLastMove={isLastMove} $isWinning={isWinningCell} $variant="black" />}
              {value === 2 && <S.Piece $isLastMove={isLastMove} $isWinning={isWinningCell} $variant="white" />}
              {isWinningCell && <S.WinningStar aria-hidden icon={mdiStar} size={16} totalSize="unset" />}
              {isPreview && <S.Preview $isInvalid={isInvalid} $variant={previewVariant} />}
            </S.Cell>
          );
        }),
      )}
    </S.Board>
  );
};

export default Board;
