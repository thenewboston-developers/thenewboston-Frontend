import {ReactNode, useId} from 'react';

import ResultArtwork from './ResultArtwork';
import * as S from './Styles';

export type GameResultOutcome = 'win' | 'loss' | 'draw' | 'complete';

interface Props {
  children: ReactNode;
  description?: ReactNode;
  game?: string;
  outcome: GameResultOutcome;
  title: ReactNode;
}

const OUTCOME_LABELS: Record<GameResultOutcome, string> = {
  complete: 'Final result',
  draw: 'Draw',
  loss: 'Match complete',
  win: 'Victory',
};

export const getGameResultOutcome = (
  winner: string | number | null | undefined,
  viewer: string | number | null | undefined,
): GameResultOutcome => {
  if (viewer == null) return 'complete';
  if (winner == null) return 'draw';
  return winner === viewer ? 'win' : 'loss';
};

export const GameResultActions = S.Actions;
export const GameResultNote = S.Note;

const GameResultPanel = ({children, description, game, outcome, title}: Props) => {
  const titleId = useId();

  return (
    <S.Panel $victory={outcome === 'win'} aria-labelledby={titleId} data-outcome={outcome}>
      <S.Header>
        <S.HeadingGroup aria-atomic="true" role="status">
          <S.Eyebrow>
            {game && <span>{game}</span>}
            <strong>{OUTCOME_LABELS[outcome]}</strong>
          </S.Eyebrow>
          <S.Title id={titleId}>{title}</S.Title>
          {description && <S.Description>{description}</S.Description>}
        </S.HeadingGroup>
        <S.Artwork $victory={outcome === 'win'}>
          <ResultArtwork victory={outcome === 'win'} />
        </S.Artwork>
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.Panel>
  );
};

export default GameResultPanel;
