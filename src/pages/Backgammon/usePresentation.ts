import {useEffect, useRef, useState} from 'react';

import {BackgammonBoard, BackgammonMatch} from 'types/backgammon';

import {getPlayerName} from './utils';

type Sound = 'dice' | 'move' | 'capture' | 'bearOff';
interface PresentationSnapshot {
  board: BackgammonBoard;
  currentRoll: string;
  match: BackgammonMatch;
}

const currentRollKey = (match: BackgammonMatch) =>
  match.phase === 'moving' && match.dice.length ? `roll-${match.id}-${match.game_number}-${match.version}` : '';

/** Observe committed snapshots and local previews, never clock-only polls or initial hydration. */
const usePresentation = (
  match: BackgammonMatch | undefined,
  board: BackgammonBoard | null,
  playSound: (sound: Sound, delayMs?: number) => void,
) => {
  const [animatedRollKey, setAnimatedRollKey] = useState('');
  const previous = useRef<PresentationSnapshot | null>(null);
  const currentRoll = match ? currentRollKey(match) : '';
  const lastTurn = match?.last_turn;
  const rollKey = currentRoll || (lastTurn ? `turn-${match?.id}-${match?.game_number}-${lastTurn.version}` : '');

  useEffect(() => {
    if (!match || !board) {
      previous.current = null;
      setAnimatedRollKey('');
      return;
    }
    const before = previous.current;
    previous.current = {board, currentRoll, match};
    if (!before || before.match.id !== match.id) {
      setAnimatedRollKey('');
      return;
    }
    if (before.match.game_number !== match.game_number) {
      setAnimatedRollKey(document.hidden ? '' : rollKey);
      if (rollKey && !document.hidden) playSound('dice');
      return;
    }
    if (document.hidden) return;

    const observedCurrentRoll = !!currentRoll && currentRoll !== before.currentRoll;
    // A completed turn can arrive between polls (particularly the computer). Its event contains the real dice.
    // If those dice were already visible during that player's turn, confirming it must not replay the roll.
    const alreadySawRoll =
      before.match.phase === 'moving' &&
      lastTurn?.version === before.match.version + 1 &&
      before.match.active_side === lastTurn?.side &&
      before.match.dice.join(',') === lastTurn?.dice.join(',');
    const unseenCompletedRoll =
      !!lastTurn && lastTurn.version > (before.match.last_turn?.version ?? 0) && !alreadySawRoll;
    const rolled = observedCurrentRoll || unseenCompletedRoll;
    if (rolled) {
      setAnimatedRollKey(rollKey);
      playSound('dice');
    }

    if (JSON.stringify(board) !== JSON.stringify(before.board)) {
      let sound: Sound = 'move';
      if (board.off.white > before.board.off.white || board.off.black > before.board.off.black) sound = 'bearOff';
      else if (board.bar.white > before.board.bar.white || board.bar.black > before.board.bar.black) sound = 'capture';
      playSound(sound, rolled ? 220 : 0);
    }
  }, [board, currentRoll, lastTurn, match, playSound, rollKey]);

  useEffect(() => {
    if (!animatedRollKey) return undefined;
    const timer = setTimeout(() => setAnimatedRollKey(''), 720);
    return () => clearTimeout(timer);
  }, [animatedRollKey]);

  return {
    animateDice: !!rollKey && animatedRollKey === rollKey,
    dice: currentRoll ? (match?.dice ?? []) : (lastTurn?.dice ?? []),
    diceLabel: !currentRoll && lastTurn && match ? `${getPlayerName(match, lastTurn.side)}’s last roll` : 'Dice',
    rollKey,
  };
};

export default usePresentation;
