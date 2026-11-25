import {mdiArrowRight, mdiMinus, mdiTrendingDown, mdiTrendingUp} from '@mdi/js';

import {ButtonColor} from 'components/Button/types';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import GameResultPanel, {getGameResultOutcome} from 'components/GameResultPanel';
import Icon from 'components/Icon';
import {ConnectFiveMatch, SFC} from 'types';

import {EmptyBoardArt, WonBoardArt} from '../../Stones';
import * as MatchStyles from '../Styles';

import * as S from './Styles';

type RematchAction = 'accept' | 'cancel' | 'decline' | 'request';
type RematchViewState = 'accepted' | 'cancelled' | 'declined' | 'idle' | 'requestedByMe' | 'requestedByOpponent';

interface ResultModalProps {
  canRequestRematch: boolean;
  isOpen: boolean;
  isRematchSubmitting: boolean;
  match: ConnectFiveMatch;
  rematchAction: RematchAction | null;
  rematchViewState: RematchViewState;
  resultOutcomeLabel: string | null;
  resultTnbDelta: number;
  selfId: number | null;
  showInsufficientFunds: boolean;
  tnbDeltaTarget: number | null;
  onClose: () => void;
  onRematchAccept: () => void;
  onRematchCancel: () => void;
  onRematchDecline: () => void;
  onRematchRequest: () => void;
}

const getEloSnapshot = (match: ConnectFiveMatch, userId: number) => {
  const isPlayerA = match.player_a.id === userId;
  const before = isPlayerA ? match.player_a_elo_before : match.player_b_elo_before;
  const after = isPlayerA ? match.player_a_elo_after : match.player_b_elo_after;

  if (before === null || after === null) return null;

  return {after, before, delta: after - before};
};

const getEloVariant = (delta: number) => {
  if (delta > 0) return 'up';
  if (delta < 0) return 'down';
  return 'equal';
};

const ResultModal: SFC<ResultModalProps> = ({
  canRequestRematch,
  isOpen,
  isRematchSubmitting,
  match,
  rematchAction,
  rematchViewState,
  resultOutcomeLabel,
  resultTnbDelta,
  selfId,
  showInsufficientFunds,
  tnbDeltaTarget,
  onClose,
  onRematchAccept,
  onRematchCancel,
  onRematchDecline,
  onRematchRequest,
}) => {
  if (!isOpen || selfId === null) return null;

  let viewer: number | string | null = null;
  if (selfId === match.player_a.id) viewer = match.mode === 'computer' ? 'a' : selfId;
  else if (match.mode !== 'computer' && selfId === match.player_b?.id) viewer = selfId;
  const eloSnapshot = viewer !== null && match.mode !== 'computer' ? getEloSnapshot(match, selfId) : null;
  const eloDelta = eloSnapshot?.delta ?? 0;
  let eloDeltaLabel = '--';
  let eloIcon = mdiMinus;

  if (eloSnapshot) {
    if (eloDelta > 0) {
      eloDeltaLabel = `+${eloDelta}`;
      eloIcon = mdiTrendingUp;
    } else if (eloDelta < 0) {
      eloDeltaLabel = `${eloDelta}`;
      eloIcon = mdiTrendingDown;
    } else {
      eloDeltaLabel = '=';
    }
  }

  const eloVariant = getEloVariant(eloDelta);
  const rematchMessage = (() => {
    if (rematchViewState === 'requestedByMe') return 'Waiting for opponent...';
    if (rematchViewState === 'requestedByOpponent') return 'Opponent wants a rematch';
    if (rematchViewState === 'cancelled') return 'Rematch cancelled';
    if (rematchViewState === 'declined') return 'Rematch declined';
    return null;
  })();
  const rematchMessageVariant =
    rematchViewState === 'cancelled' || rematchViewState === 'declined' ? 'warning' : 'neutral';
  let rematchButtons = null;

  if (rematchViewState === 'requestedByOpponent') {
    rematchButtons = (
      <>
        <MatchStyles.Button
          color={ButtonColor.secondary}
          disabled={isRematchSubmitting}
          isSubmitting={rematchAction === 'decline'}
          onClick={onRematchDecline}
          text="Decline"
        />
        <MatchStyles.Button
          disabled={isRematchSubmitting}
          isSubmitting={rematchAction === 'accept'}
          onClick={onRematchAccept}
          text="Accept"
        />
      </>
    );
  } else if (rematchViewState === 'requestedByMe') {
    rematchButtons = (
      <MatchStyles.Button
        color={ButtonColor.secondary}
        disabled={isRematchSubmitting}
        isSubmitting={rematchAction === 'cancel'}
        onClick={onRematchCancel}
        text="Cancel"
      />
    );
  } else if (rematchViewState === 'idle') {
    rematchButtons = (
      <MatchStyles.Button
        disabled={isRematchSubmitting || !canRequestRematch}
        isSubmitting={rematchAction === 'request'}
        onClick={onRematchRequest}
        text={match.mode === 'computer' ? 'Play again' : 'Rematch'}
      />
    );
  }

  if (viewer === null) rematchButtons = null;

  const winner = match.mode === 'computer' ? match.winner_side : match.winner;
  const resultVariant = match.status === 'cancelled' ? 'complete' : getGameResultOutcome(winner, viewer);
  const tnbDeltaLabel =
    tnbDeltaTarget !== null ? `${resultTnbDelta > 0 ? '+' : ''}${resultTnbDelta.toLocaleString()} TNB` : null;
  const tnbVariant: 'loss' | 'win' = resultTnbDelta >= 0 ? 'win' : 'loss';
  let resultLabel = resultOutcomeLabel ?? 'Match complete';
  if (resultVariant === 'win') resultLabel = resultOutcomeLabel ?? 'You won!';
  if (resultVariant === 'loss') resultLabel = resultOutcomeLabel ?? 'You lost';
  if (resultVariant === 'draw') resultLabel = 'It’s a draw';
  if (resultVariant === 'complete') resultLabel = 'Match complete';
  const resultDescriptions: Record<string, string> = {
    cancelled: 'Match cancelled',
    finished_connect5: 'Five in a row',
    finished_full_board: 'The board is full',
    finished_resign: 'Match ended by resignation',
    finished_timeout: 'A player ran out of time',
  };

  return (
    <S.ResultModal close={onClose} header="Match Results">
      <S.ResultModalBody>
        <GameResultPanel
          artwork={resultVariant === 'win' ? <WonBoardArt /> : <EmptyBoardArt />}
          description={resultDescriptions[match.status]}
          game="Connect Five"
          outcome={resultVariant}
          title={resultLabel}
        >
          {match.mode !== 'computer' && viewer !== null && (
            <S.EloChange>
              <S.EloChangeLabel>Your ELO</S.EloChangeLabel>
              <S.EloChangeRow>
                <S.EloNumber>{eloSnapshot?.before ?? '--'}</S.EloNumber>
                <S.EloChangeArrow icon={mdiArrowRight} size={18} />
                <S.EloNumber>{eloSnapshot?.after ?? '--'}</S.EloNumber>
                <S.EloChangeValue $variant={eloVariant}>
                  <span>({eloDeltaLabel})</span>
                  <Icon icon={eloIcon} size={20} />
                </S.EloChangeValue>
              </S.EloChangeRow>
            </S.EloChange>
          )}
          {match.mode === 'computer' && (
            <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} />
          )}
          {match.mode === 'computer' && <S.RematchNotice>Free computer game · ELO unchanged</S.RematchNotice>}
          {tnbDeltaLabel && (
            <S.ResultTnbChange>
              <S.ResultTnbChangeValue $variant={tnbVariant}>{tnbDeltaLabel}</S.ResultTnbChangeValue>
            </S.ResultTnbChange>
          )}
          {rematchMessage && <S.RematchStateText $variant={rematchMessageVariant}>{rematchMessage}</S.RematchStateText>}
          {showInsufficientFunds && <S.RematchNotice>Insufficient funds for rematch</S.RematchNotice>}
        </GameResultPanel>
      </S.ResultModalBody>
      <S.ResultModalFooter>
        <MatchStyles.Button color={ButtonColor.secondary} onClick={onClose} text="Close" />
        {rematchButtons}
      </S.ResultModalFooter>
    </S.ResultModal>
  );
};

export default ResultModal;
