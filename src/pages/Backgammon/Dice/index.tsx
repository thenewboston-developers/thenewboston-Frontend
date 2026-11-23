import {BackgammonMove} from 'types/backgammon';

import * as S from './Styles';

const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

interface DiceProps {
  animate?: boolean;
  dice: number[];
  label?: string;
  moves?: BackgammonMove[];
  rolling?: boolean;
  rollKey?: string;
}

const Dice = ({animate = false, dice, label = 'Dice', moves = [], rolling = false, rollKey = ''}: DiceProps) => {
  const available = dice.length === 2 && dice[0] === dice[1] ? Array(4).fill(dice[0]) : dice;
  const visibleDice = rolling ? [0, 0] : available;
  const used = moves.map((move) => move.die);
  if (!visibleDice.length) return null;
  return (
    <S.Group aria-busy={rolling} aria-label={rolling ? 'Rolling dice' : label} role="group">
      {label !== 'Dice' && !rolling && <S.Caption>{label}</S.Caption>}
      <S.Dice>
        {visibleDice.map((die, index) => {
          const usedIndex = used.indexOf(die);
          const isUsed = !rolling && usedIndex !== -1;
          if (isUsed) used.splice(usedIndex, 1);
          return (
            <S.Die
              $animate={animate}
              $index={index}
              $rolling={rolling}
              $used={isUsed}
              aria-label={rolling ? 'Rolling die' : `Die ${die}${isUsed ? ', used' : ''}`}
              data-rolling={rolling || (animate && !isUsed) || undefined}
              key={`${rollKey}-${rolling ? 'pending' : 'result'}-${index}`}
              role="img"
            >
              {Array.from({length: 9}, (_, dot) => (
                <S.Dot $visible={PIPS[die]?.includes(dot) ?? false} key={dot} />
              ))}
            </S.Die>
          );
        })}
      </S.Dice>
    </S.Group>
  );
};

export default Dice;
