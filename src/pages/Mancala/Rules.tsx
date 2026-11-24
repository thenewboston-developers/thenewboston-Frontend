import * as S from './Styles';

const Rules = () => (
  <S.Rules>
    <summary>How to play Mancala</summary>
    <ol>
      <li>
        Each player owns the six pits on their side of the board and the store to their right. Every pit starts with
        four stones. One of the two players is picked at random to move first.
      </li>
      <li>
        On your turn, pick one of your pits. Its stones are sown one at a time into the pits that follow, moving
        counter-clockwise: along your row, into your store, then along your opponent’s row. Your opponent’s store is
        skipped.
      </li>
      <li>If your last stone lands in your own store, you play again.</li>
      <li>
        If your last stone lands in an empty pit on your side and the pit across from it has stones, you capture both
        into your store.
      </li>
      <li>
        The game ends when either row is empty. Stones left in the other row go to that row’s owner. The player with
        more stones in their store wins; 24 each is a draw.
      </li>
      <li>
        Your clock runs only during your turns and covers the whole match. Running out of time or resigning loses the
        match.
      </li>
      <li>
        Computer games are free. Matches against members can be free or use equal, fixed TNB stakes: the winner receives
        both stakes and a draw returns them. A cancelled, declined, or expired invitation refunds the challenger.
      </li>
      <li>
        In the move list, pits are numbered 1 to 6 in the direction of play, so pit 6 is the one next to that player’s
        store.
      </li>
    </ol>
  </S.Rules>
);

export default Rules;
