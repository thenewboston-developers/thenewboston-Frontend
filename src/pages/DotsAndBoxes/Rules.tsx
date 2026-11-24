import * as S from './Styles';

const Rules = () => (
  <S.Rules>
    <summary>How to play Dots and Boxes</summary>
    <ol>
      <li>
        The board is a grid of dots. Players take turns drawing one line between two neighboring dots, across or down.
        Click or tap an open line to draw it immediately. Blue draws first.
      </li>
      <li>
        Draw the fourth side of a box to claim it. The box takes your color and you draw again. One line can finish two
        boxes at once.
      </li>
      <li>
        You must draw a line on every turn, even when every line left gives your opponent a box. A line that claims
        nothing passes the turn.
      </li>
      <li>
        The game ends when every box is claimed. The player with more boxes wins. Equal boxes, possible on the 4 × 4
        board, is a draw and both players’ stakes are refunded.
      </li>
      <li>
        Your clock runs during your turn, including while you keep the turn. Running out of time or resigning loses the
        match.
      </li>
      <li>
        Computer games are free. Human matches use equal, fixed TNB stakes, or 0 TNB for free play. The winner receives
        both stakes. Canceled, declined, and expired invitations refund the challenger.
      </li>
    </ol>
  </S.Rules>
);

export default Rules;
