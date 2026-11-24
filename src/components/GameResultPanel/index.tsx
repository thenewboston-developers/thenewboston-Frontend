import {ReactNode, useId} from 'react';

import ResultArtwork from './ResultArtwork';
import * as S from './Styles';

export type GameResultOutcome = 'win' | 'loss' | 'draw' | 'complete';

interface GameResultScore {
  label: string;
  value: number;
  winner?: boolean;
}

interface Props {
  children: ReactNode;
  description?: ReactNode;
  game?: string;
  outcome: GameResultOutcome;
  scoreLabel?: string;
  scores?: [GameResultScore, GameResultScore];
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

const GameResultPanel = ({children, description, game, outcome, scoreLabel = 'Final score', scores, title}: Props) => {
  const titleId = useId();
  const totalScore = scores ? scores[0].value + scores[1].value : 0;

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
        <S.Artwork>
          <ResultArtwork outcome={outcome} />
        </S.Artwork>
      </S.Header>
      {scores && (
        <S.Scoreboard aria-label={scoreLabel} role="group">
          <S.ScoreLabel>{scoreLabel}</S.ScoreLabel>
          <S.ScorePlayers>
            {scores.map(({label, value, winner}, index) => (
              <S.ScorePlayer $winner={!!winner} key={index}>
                <S.ScoreName>
                  {label}
                  {winner && <S.WinnerBadge>Winner</S.WinnerBadge>}
                </S.ScoreName>
                <S.ScoreValue>{value.toLocaleString()}</S.ScoreValue>
              </S.ScorePlayer>
            ))}
          </S.ScorePlayers>
          <S.ScoreTrack aria-hidden="true">
            <S.ScoreShare style={{width: `${totalScore ? (scores[0].value / totalScore) * 100 : 50}%`}} />
          </S.ScoreTrack>
        </S.Scoreboard>
      )}
      <S.Content>{children}</S.Content>
    </S.Panel>
  );
};

export default GameResultPanel;
