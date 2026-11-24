import * as S from './Styles';

const Rules = () => (
  <S.Rules>
    <summary>How to play Checkers</summary>
    <ol>
      <li>
        Each player starts with 12 pieces on the dark squares. Ivory (white) moves first. Move a man one square
        diagonally forward.
      </li>
      <li>
        Capture by jumping diagonally over an adjacent opponent into an empty square. If any capture is available, you
        must capture. Men can only move and capture forward.
      </li>
      <li>
        Keep jumping with the same piece until no further capture is available. Choose any complete capture route; you
        do not have to take the longest one.
      </li>
      <li>
        Reach the opposite back row to become a king. Crowning ends that turn. Kings move and capture diagonally in
        either direction, one step or jump at a time.
      </li>
      <li>
        To move, drag a piece onto a gold dot, or select it and then the dot. A move is played as soon as its last jump
        lands, so there is nothing to confirm; during a jump chain you can undo a jump until the chain is complete.
      </li>
      <li>
        Win by capturing every opposing piece or leaving your opponent without a legal move. Your clock runs during your
        turn; running out of time or resigning loses the match.
      </li>
      <li>
        A position repeated three times, or 80 turns without a capture or a man moving, ends in a draw. Both players’
        stakes are refunded.
      </li>
      <li>
        Computer games are free. Human matches use equal, fixed TNB stakes, or 0 TNB for free play. The winner receives
        both stakes. Canceled, declined, and expired invitations refund the challenger.
      </li>
    </ol>
  </S.Rules>
);

export default Rules;
