import {ComponentType, SVGProps} from 'react';

import {ConnectFiveMoveType, ConnectFiveSpecialType} from 'enums';
import {ConnectFiveMatchPlayer, SFC} from 'types';

import {ReactComponent as BombIcon} from '../assets/bomb.svg';
import {ReactComponent as Horizontal2Icon} from '../assets/horizontal2.svg';
import {ReactComponent as SingleIcon} from '../assets/single.svg';
import {ReactComponent as Vertical2Icon} from '../assets/vertical2.svg';

import * as S from './Styles';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface PieceToolbarProps {
  activeMoveType: ConnectFiveMoveType;
  getInventoryCount: (player: ConnectFiveMatchPlayer | null, specialType: ConnectFiveSpecialType) => number;
  isInteractive: boolean;
  matchPlayer: ConnectFiveMatchPlayer | null;
  moveToSpecialType: Record<ConnectFiveMoveType, ConnectFiveSpecialType | null>;
  onToolSelect: (moveType: ConnectFiveMoveType) => void;
  playerSide: 'black' | 'white' | null;
}

const TOOL_LABELS: Record<ConnectFiveMoveType, string> = {
  [ConnectFiveMoveType.BOMB]: 'Bomb',
  [ConnectFiveMoveType.H2]: 'Horizontal 2',
  [ConnectFiveMoveType.SINGLE]: 'Single',
  [ConnectFiveMoveType.V2]: 'Vertical 2',
};

const TOOL_ICONS: Record<ConnectFiveMoveType, IconComponent> = {
  [ConnectFiveMoveType.BOMB]: BombIcon,
  [ConnectFiveMoveType.H2]: Horizontal2Icon,
  [ConnectFiveMoveType.SINGLE]: SingleIcon,
  [ConnectFiveMoveType.V2]: Vertical2Icon,
};

const ORDERED_MOVE_TYPES: ConnectFiveMoveType[] = [
  ConnectFiveMoveType.SINGLE,
  ConnectFiveMoveType.H2,
  ConnectFiveMoveType.V2,
  ConnectFiveMoveType.BOMB,
];

const PieceToolbar: SFC<PieceToolbarProps> = ({
  activeMoveType,
  className,
  getInventoryCount,
  isInteractive,
  matchPlayer,
  moveToSpecialType,
  onToolSelect,
  playerSide,
}) => {
  if (!playerSide) return null;

  return (
    <S.Toolbar className={className}>
      {ORDERED_MOVE_TYPES.map((moveType) => {
        const isSingle = moveType === ConnectFiveMoveType.SINGLE;
        const specialType = moveToSpecialType[moveType];
        const inventory = specialType ? getInventoryCount(matchPlayer, specialType) : 0;
        const isDisabled = !!specialType && !inventory;

        if (isInteractive) {
          return (
            <S.ToolButton
              $isActive={activeMoveType === moveType}
              $isDisabled={isDisabled}
              aria-label={TOOL_LABELS[moveType]}
              disabled={isDisabled}
              key={moveType}
              onClick={() => {
                if (isDisabled) return;
                onToolSelect(moveType);
              }}
              type="button"
            >
              <S.ToolIcon $variant={playerSide} aria-hidden as={TOOL_ICONS[moveType]} focusable="false" />
              {!isSingle && <S.ToolCount>{inventory}</S.ToolCount>}
            </S.ToolButton>
          );
        }

        return (
          <S.ToolButtonReadOnly $isDisabled={isDisabled} key={moveType}>
            <S.ToolIcon $variant={playerSide} aria-hidden as={TOOL_ICONS[moveType]} focusable="false" />
            {!isSingle && <S.ToolCount>{inventory}</S.ToolCount>}
          </S.ToolButtonReadOnly>
        );
      })}
    </S.Toolbar>
  );
};

export default PieceToolbar;
