import {
  mdiArrowRight,
  mdiEmoticonExcitedOutline,
  mdiEmoticonSadOutline,
  mdiMinus,
  mdiTrendingDown,
  mdiTrendingUp,
} from '@mdi/js';

import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import Icon from 'components/Icon';
import {ModalBody, ModalFooter} from 'components/Modal';
import {ConnectFiveMatch, SFC} from 'types';

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
  if (!isOpen || !selfId) return null;

  const eloSnapshot = getEloSnapshot(match, selfId);
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
        <Button
          color={ButtonColor.secondary}
          disabled={isRematchSubmitting}
          isSubmitting={rematchAction === 'decline'}
          onClick={onRematchDecline}
          text="Decline"
        />
        <Button
          disabled={isRematchSubmitting}
          isSubmitting={rematchAction === 'accept'}
          onClick={onRematchAccept}
          text="Accept"
        />
      </>
    );
  } else if (rematchViewState === 'requestedByMe') {
    rematchButtons = (
      <Button
        color={ButtonColor.secondary}
        disabled={isRematchSubmitting}
        isSubmitting={rematchAction === 'cancel'}
        onClick={onRematchCancel}
        text="Cancel"
      />
    );
  } else if (rematchViewState === 'idle') {
    rematchButtons = (
      <Button
        disabled={isRematchSubmitting || !canRequestRematch}
        isSubmitting={rematchAction === 'request'}
        onClick={onRematchRequest}
        text="Rematch"
      />
    );
  }

  const isWinner = match.winner === selfId;
  const tnbDeltaLabel =
    tnbDeltaTarget !== null ? `${resultTnbDelta > 0 ? '+' : ''}${resultTnbDelta.toLocaleString()} TNB` : null;
  const tnbVariant: 'loss' | 'win' = isWinner ? 'win' : 'loss';
  let resultVariant: 'loss' | 'win' = 'loss';
  let resultLabel = resultOutcomeLabel ?? 'You lost';

  if (isWinner) {
    resultVariant = 'win';
    resultLabel = resultOutcomeLabel ?? 'You won!';
  }

  return (
    <S.ResultModal close={onClose} header="Match Results">
      <ModalBody>
        <S.ResultSummary $variant={resultVariant}>
          <S.ResultOutcome $variant={resultVariant}>{resultLabel}</S.ResultOutcome>
        </S.ResultSummary>
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
        {tnbDeltaLabel && (
          <S.ResultTnbChange>
            <S.ResultFaceIcon
              $variant={tnbVariant}
              icon={isWinner ? mdiEmoticonExcitedOutline : mdiEmoticonSadOutline}
              size={32}
            />
            <S.ResultTnbChangeValue $variant={tnbVariant}>{tnbDeltaLabel}</S.ResultTnbChangeValue>
          </S.ResultTnbChange>
        )}
        {rematchMessage && <S.RematchStateText $variant={rematchMessageVariant}>{rematchMessage}</S.RematchStateText>}
        {showInsufficientFunds && <S.RematchNotice>Insufficient funds for rematch</S.RematchNotice>}
      </ModalBody>
      <ModalFooter>
        <Button color={ButtonColor.secondary} onClick={onClose} text="Close" />
        {rematchButtons}
      </ModalFooter>
    </S.ResultModal>
  );
};

export default ResultModal;
