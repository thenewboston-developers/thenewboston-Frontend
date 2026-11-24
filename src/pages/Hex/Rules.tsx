import * as S from './Styles';

const Rules = () => (
  <S.Rules>
    <summary>How to play Hex</summary>
    <ol>
      <li>
        The board is a diamond of six-sided cells with two red edges facing each other and two blue edges facing each
        other. Red owns the red edges and Blue owns the blue ones.
      </li>
      <li>
        Red moves first. Players take turns placing one stone on any empty cell. Stones never move and are never
        captured.
      </li>
      <li>
        Win by joining your two edges with an unbroken chain of your stones. The chain can twist anywhere on the board;
        only touching cells count as joined. The four corner cells belong to both edges they sit on.
      </li>
      <li>
        There are no draws. A chain between one pair of edges always cuts the other pair apart, so blocking your
        opponent and building your own chain are the same job.
      </li>
      <li>
        Swap rule, for matches between two players: moving first is a big advantage, so right after Red’s first stone
        Blue may take that stone over instead of placing one. The stone turns blue and moves to its mirror cell, the
        players keep their colors, and Red moves next. Open with a stone you would be happy to see on either side.
      </li>
      <li>
        Against the computer you are Red, you move first, and there is no swap. Your clock runs during your turn;
        running out of time or resigning loses the match.
      </li>
      <li>
        Computer games are free. Matches between players use equal, fixed TNB stakes, or 0 TNB for free play. The winner
        receives both stakes. Canceled, declined, and expired invitations refund the challenger.
      </li>
    </ol>
  </S.Rules>
);

export default Rules;
