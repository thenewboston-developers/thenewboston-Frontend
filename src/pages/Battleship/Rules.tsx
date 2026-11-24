import * as S from './Styles';

const Rules = () => (
  <S.Rules>
    <summary>How to play Battleship</summary>
    <ol>
      <li>
        Place five ships on your 10 × 10 grid: carrier (5), battleship (4), cruiser (3), submarine (3), and destroyer
        (2). Ships can touch, but cannot overlap or extend beyond the grid.
      </li>
      <li>
        Both players have five minutes to lock their fleet. If only one is ready when time expires, that player wins. If
        neither is ready, both stakes are refunded.
      </li>
      <li>
        Once both fleets are locked, take turns firing one shot. A hit reveals a ship segment; hitting every segment
        sinks that ship. A hit does not grant another turn.
      </li>
      <li>
        Sink all five opposing ships to win. Your clock runs only during your turn. Running out of time or resigning
        loses the match.
      </li>
      <li>
        Computer games are free. Human matches can be free or use equal, fixed TNB stakes. The winner receives both
        stakes. A canceled, declined, or expired invitation refunds the challenger.
      </li>
      <li>
        Only the two players can open a match. Your opponent sees your misses, hits, and sunk ships, never your unhit
        fleet.
      </li>
    </ol>
  </S.Rules>
);

export default Rules;
